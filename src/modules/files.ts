import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { nanoid } from 'nanoid';
import checks from './checks';

const tempDir = fs.realpathSync(os.tmpdir());

const getPath = (prefix = '') => path.join(tempDir, prefix + nanoid());

function temporaryDirectory({ prefix = '' } = {}) {
  const directory = getPath(prefix);

  fs.mkdirSync(directory);
  return directory;
}

function temporaryFile({ name, extension }: { name?: string, extension?: string } = {}) {
  if (name) {
    return path.join(temporaryDirectory(), name);
  }

  return getPath() + (checks.isBlank(extension) ? '' : '.' + (extension as string).replace(/^\./, ''));
}

export default {
  temporaryDirectory,
  temporaryFile
};
