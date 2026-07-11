// backend/config/firebase.js
import admin from "firebase-admin";
import { createRequire } from "module";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);

// Dynamically look for the file in the root first (e.g., Render production), 
// then fall back to the config/ directory (e.g., Local development)
const rootPath = path.resolve(process.cwd(), 'firebase-service-account.json');
const configPath = path.resolve(process.cwd(), 'config/firebase-service-account.json');

// Determine the correct absolute path based on file existence
const serviceAccountPath = fs.existsSync(rootPath) ? rootPath : configPath;

// Safely require the JSON configuration file using the resolved path[cite: 14]
const serviceAccount = require(serviceAccountPath);

// Initialize the Firebase Admin instance if one does not already exist[cite: 14]
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;