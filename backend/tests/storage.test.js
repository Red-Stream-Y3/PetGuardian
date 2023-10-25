import fs from 'fs';
import path from 'path';
import { deleteFile, uploadFile } from '../utils/StorageUtils';

const dummyImgData = fs.readFileSync(
  path.join(__dirname, './testAssets/testphoto.png')
);

const dummyImg = {
  originalname: 'testphoto.png',
  buffer: dummyImgData,
  mimetype: 'image/png'
};

describe('Storage Utils', () => {
  test('It should upload a file', async () => {
    await expect(uploadFile(dummyImg)).resolves.toContain(
      'https://storage.googleapis.com/'
    );
  }, 60000);

  test('It should throw an error if no file is uploaded', async () => {
    await expect(uploadFile()).rejects.toContain('No file to upload');
  });

  test('It should delete a file', async () => {
    await expect(deleteFile(dummyImg.originalname)).resolves.toBe('success');
  }, 10000);
});
