//@ts-check
const { basename, resolve } = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = resolve(__dirname, '../../');

/**
 * Prepares the library to be published by building and packing it.
 *
 * _NOTE:_ It must be executed from the lib directory (via `lerna exec`)
 */
async function main() {
  const cwd = process.cwd();
  const libName = basename(cwd);

  buildLib(libName);
  packLib();
}

/** @param {string} libName */
function buildLib(libName) {
  execSync(`npx nx build ${libName}`, { stdio: 'inherit', cwd: ROOT_DIR });
}

async function packLib() {
  execSync(`node ${ROOT_DIR}/tools/scripts/pack-lib.js`, { stdio: 'inherit' });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
