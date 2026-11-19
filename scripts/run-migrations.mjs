/**
 * Applies `supabase/migrations/*.sql` in order using a direct Postgres connection.
 *
 * Requires DATABASE_URL in `.env` (Supabase Dashboard → Settings → Database → URI).
 * Use the **direct** connection (port 5432) or **session mode** pooler if your plan allows DDL.
 *
 * Usage: npm run db:migrate
 */

import postgres from "postgres";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error(
    "Missing DATABASE_URL. Add it to .env — copy the Postgres URI from Supabase Dashboard → Database (include password).",
  );
  process.exit(1);
}

const migrationsDir = join(root, "supabase", "migrations");
const files = (await readdir(migrationsDir))
  .filter((f) => f.endsWith(".sql"))
  .sort();

const sql = postgres(url, {
  ssl: "require",
  max: 1,
  connection: { application_name: "rwahub-migrate" },
});

try {
  for (const file of files) {
    const content = await readFile(join(migrationsDir, file), "utf8");
    console.log("Applying:", file);
    await sql.unsafe(content);
  }
  console.log("Migrations applied successfully.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
