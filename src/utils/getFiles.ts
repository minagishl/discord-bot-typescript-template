import fs from 'node:fs/promises';
import path from 'node:path';

const getFiles = async (
  dirPath: string,
  result: string[] = [],
): Promise<string[]> => {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        await getFiles(filePath, result);
      } else if (/\.(js|ts)$/.test(filePath)) {
        result.push(filePath);
      }
    }
    return result;
  } catch (err: any) {
    console.error(err);
    return [];
  }
};

export default getFiles;
