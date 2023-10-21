import getStorageClient from '../config/GoogleConfig.js';
import findConfig from 'find-config';
import dotenv from 'dotenv';
import { format } from 'url';

let BUCKET_NAME;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: findConfig('.env.dev') });
  BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME;
} else BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME;

//get storage client
const client = getStorageClient();

export const uploadFile = async (file) =>
  new Promise(async (resolve, reject) => {
    const bucket = client.bucket(BUCKET_NAME);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', (err) => {
        reject(err);
      })
      .end(file.buffer);
  });

export const deleteFile = async (filename) =>
  new Promise((resolve, reject) => {
    const bucket = client.bucket(BUCKET_NAME);
    const blob = bucket.file(filename);

    blob
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

export const downloadFile = async (filename) =>
  new Promise((resolve, reject) => {
    const bucket = client.bucket(BUCKET_NAME);
    const blob = bucket.file(filename);

    blob
      .download()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
