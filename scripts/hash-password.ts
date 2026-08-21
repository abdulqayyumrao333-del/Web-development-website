import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-password -- \"your-password-here\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// IMPORTANT: Next.js's built-in .env loader auto-expands "$VAR" references
// (e.g. treats $2a as a reference to a variable named "2a", replacing it with
// an empty string since no such variable exists). Bcrypt hashes always
// contain multiple $ delimiters (e.g. $2a$12$...), so the raw hash gets
// silently corrupted if pasted as-is. Per Next.js's own docs, the fix is to
// escape every literal $ with a backslash: \$
const escapedHash = hash.replace(/\$/g, "\\$");

console.log("\nAdd this to your .env file (the \\$ escaping is required — paste exactly as shown):\n");
console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"\n`);
