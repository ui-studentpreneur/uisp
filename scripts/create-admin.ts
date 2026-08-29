/**
 * Creates the admin account, or resets its password if it already exists.
 *
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from `.env.local`:
 *   pnpm admin:create
 *
 * Separate from `pnpm db:seed` because rotating a password should not mean
 * re-running content seeding.
 */
import { adminEmail, upsertAdmin } from "./admin";

async function main(): Promise<void> {
  const outcome = await upsertAdmin();
  const verb = outcome === "created" ? "created" : "password reset";
  console.log(`\u2713 admin account ${verb} for ${adminEmail()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
