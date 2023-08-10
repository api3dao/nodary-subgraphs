import path from 'path';
import prettier from 'prettier';
import fs, { readFileSync } from 'fs';
import YAML from 'yaml';

const PRETTIER_CONFIG = path.join(__dirname, '../.prettierrc');

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readYamlFile = (filePath: string) => YAML.parse(readFileSync(filePath).toString('utf8'));

export const writeJsonFile = async (path: string, payload: any) => {
  const prettierConfig = JSON.parse(fs.readFileSync(PRETTIER_CONFIG, 'utf-8'));
  const formattedContent = await prettier.format(JSON.stringify(payload), { parser: 'json', ...prettierConfig });
  fs.writeFileSync(path, formattedContent);
};

export const writeYamlFile = async (path: string, payload: any) => {
  const prettierConfig = JSON.parse(fs.readFileSync(PRETTIER_CONFIG, 'utf-8'));
  const formattedContent = await prettier.format(YAML.stringify(payload), { parser: 'yaml', ...prettierConfig });
  fs.writeFileSync(path, formattedContent);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
