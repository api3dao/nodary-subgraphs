import path from 'path';
import prettier from 'prettier';
import fs from 'fs';

const PRETTIER_CONFIG = path.join(__dirname, '../.prettierrc');

export const writeJsonFile = async (path: string, payload: any) => {
  const prettierConfig = JSON.parse(fs.readFileSync(PRETTIER_CONFIG, 'utf-8'));
  const formattedContent = await prettier.format(payload, { parser: 'json', ...prettierConfig });
  fs.writeFileSync(path, formattedContent);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
