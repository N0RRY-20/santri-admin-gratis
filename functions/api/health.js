import { neon } from '@neondatabase/serverless';

// GET /api/health — mengembalikan status + timestamp database.
// Koneksi memakai env var DATABASE_URL (Neon pooled connection string).
// Secret diset via dashboard Cloudflare Pages, TIDAK di-commit.
export async function onRequestGet({ env }) {
  if (!env.DATABASE_URL) {
    return Response.json(
      { status: 'error', reason: 'DATABASE_URL belum diset di environment Pages' },
      { status: 500 }
    );
  }
  try {
    const sql = neon(env.DATABASE_URL);
    const rows = await sql`SELECT now() AS db_time`;
    return Response.json({ status: 'ok', db_time: rows[0].db_time });
  } catch (err) {
    return Response.json(
      { status: 'error', reason: String(err && err.message ? err.message : err) },
      { status: 500 }
    );
  }
}
