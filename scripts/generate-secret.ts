import crypto from "crypto";

const secret = crypto.randomBytes(32).toString("base64");

console.log("\nAdd this to your .env file (replace the placeholder AUTH_SECRET line):\n");
console.log(`AUTH_SECRET="${secret}"\n`);
