import type { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

async function processFile(
  file: Dirent,
  dirPath: string,
  result: string[],
): Promise<void> {
  const filePath = path.join(dirPath, file.name);
  if (file.isDirectory()) {
    await getFiles(filePath, result);
  } else if (/\.(js|ts)$/.test(filePath)) {
    result.push(filePath);
  }
}

export default async function getFiles(
  dirPath: string,
  result: string[] = [],
): Promise<string[]> {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    await Promise.all(
      files.map(async (file) => {
        await processFile(file, dirPath, result);
      }),
    );
    return result;
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}
