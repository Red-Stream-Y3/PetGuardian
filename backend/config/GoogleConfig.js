import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import findConfig from 'find-config';
import dotenv from 'dotenv';

//const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let credentials;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: findConfig('.env.dev') });
  credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
} else credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

//constants
const GOOGLE_KEY = path.join(__dirname, `./${credentials}`);

const getStorageClient = () => {
  return new Storage({
    keyFilename: GOOGLE_KEY,
    projectId: process.env.GOOGLE_PROJECT_ID
  });
};

export default getStorageClient;
