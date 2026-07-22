require('dotenv').config();

const path = require('path');
const express = require('express');
const { Pool } = require('pg');
const fallbackPortfolio = require('./data/portfolio');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const databaseUrl = process.env.DATABASE_URL;

app.use(express.json());

// PostgreSQL stores the nested portfolio collections in JSONB columns. This keeps
// the API response compact while still giving PostgreSQL structured, queryable data.
const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
    })
  : null;

async function connectDatabase() {
  if (!pool) {
    console.log('DATABASE_URL not set. Serving seeded portfolio data from memory.');
    return false;
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_profiles (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        location TEXT NOT NULL,
        email TEXT NOT NULL,
        availability TEXT NOT NULL,
        looking_for TEXT NOT NULL DEFAULT '',
        summary TEXT NOT NULL,
        about TEXT NOT NULL DEFAULT '',
        resume_href TEXT NOT NULL DEFAULT '',
        links JSONB NOT NULL DEFAULT '[]'::jsonb,
        education JSONB NOT NULL DEFAULT '[]'::jsonb,
        research JSONB NOT NULL DEFAULT '[]'::jsonb,
        stats JSONB NOT NULL DEFAULT '[]'::jsonb,
        skills JSONB NOT NULL DEFAULT '[]'::jsonb,
        projects JSONB NOT NULL DEFAULT '[]'::jsonb,
        experience JSONB NOT NULL DEFAULT '[]'::jsonb,
        services JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS links JSONB NOT NULL DEFAULT '[]'::jsonb
    `);
    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS looking_for TEXT NOT NULL DEFAULT ''
    `);
    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS about TEXT NOT NULL DEFAULT ''
    `);
    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS resume_href TEXT NOT NULL DEFAULT ''
    `);
    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS education JSONB NOT NULL DEFAULT '[]'::jsonb
    `);
    await pool.query(`
      ALTER TABLE portfolio_profiles
      ADD COLUMN IF NOT EXISTS research JSONB NOT NULL DEFAULT '[]'::jsonb
    `);

    const { rowCount } = await pool.query('SELECT id FROM portfolio_profiles LIMIT 1');
    if (rowCount === 0) {
      await pool.query(
        `INSERT INTO portfolio_profiles
          (name, role, location, email, availability, looking_for, summary, about, resume_href, links, education, research, stats, skills, projects, experience, services)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11::jsonb, $12::jsonb, $13::jsonb, $14::jsonb, $15::jsonb, $16::jsonb, $17::jsonb)`,
        [
          fallbackPortfolio.name,
          fallbackPortfolio.role,
          fallbackPortfolio.location,
          fallbackPortfolio.email,
          fallbackPortfolio.availability,
          fallbackPortfolio.lookingFor,
          fallbackPortfolio.summary,
          fallbackPortfolio.about,
          fallbackPortfolio.resumeHref,
          JSON.stringify(fallbackPortfolio.links),
          JSON.stringify(fallbackPortfolio.education),
          JSON.stringify(fallbackPortfolio.research),
          JSON.stringify(fallbackPortfolio.stats),
          JSON.stringify(fallbackPortfolio.skills),
          JSON.stringify(fallbackPortfolio.projects),
          JSON.stringify(fallbackPortfolio.experience),
          JSON.stringify(fallbackPortfolio.services)
        ]
      );
      console.log('PostgreSQL connected and seeded with portfolio data.');
    } else {
      console.log('PostgreSQL connected.');
    }
    return true;
  } catch (error) {
    console.warn(`PostgreSQL unavailable: ${error.message}`);
    console.warn('Continuing with seeded in-memory portfolio data.');
    return false;
  }
}

let databaseReady = false;

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    database: databaseReady ? 'postgresql' : 'memory'
  });
});

app.get('/api/profile', async (_request, response) => {
  if (!databaseReady || !pool) {
    response.json(fallbackPortfolio);
    return;
  }

  try {
    const { rows } = await pool.query(`
      SELECT name, role, location, email, availability, looking_for AS "lookingFor",
             summary, about, resume_href AS "resumeHref", links, education, research,
             stats, skills, projects, experience, services
      FROM portfolio_profiles
      ORDER BY id
      LIMIT 1
    `);
    response.json(rows[0] || fallbackPortfolio);
  } catch (error) {
    console.warn(`Portfolio query failed: ${error.message}`);
    response.json(fallbackPortfolio);
  }
});

const browserBuild = path.join(__dirname, '..', 'dist');
app.use(express.static(browserBuild));

// React Router is not currently used, but this fallback keeps direct browser routes safe.
app.get('*', (_request, response) => {
  response.sendFile(path.join(browserBuild, 'index.html'));
});

connectDatabase().then((ready) => {
  databaseReady = ready;
  app.listen(port, host, () => {
    console.log(`PERN portfolio running at http://${host}:${port}`);
  });
});
