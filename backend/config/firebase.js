// backend/config/firebase.js
import admin from "firebase-admin";
import { createRequire } from "module";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);

// 1. Define paths for both Render production (root) and Local development (config folder)
const renderRootPath = path.resolve(process.cwd(), 'firebase-service-account.json');
const localConfigPath = path.resolve(process.cwd(), 'config', 'firebase-service-account.json');

// 2. Automatically pick the path that actually contains the secret credentials file
const absolutePathToSecret = fs.existsSync(renderRootPath) ? renderRootPath : localConfigPath;

// 3. Cleanly require the service account JSON file using the resolved path
const serviceAccount = require(absolutePathToSecret);

// 4. Initialize the Firebase Admin SDK if an instance does not already exist
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;