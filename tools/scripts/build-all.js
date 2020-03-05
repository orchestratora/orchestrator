const { execSync } = require('child_process');

const projects = require('../../nx.json').projects;

async function main() {
  const projectsToBuild = Object.entries(projects)
    .filter(([_, p]) => p.tags && !p.tags.includes('e2e'))
    .map(([name]) => name);

  console.log(`Building projects: ${projectsToBuild.join(', ')}...`);

  execSync(
    `npx nx run-many --target build --with-deps --projects ${projectsToBuild.join(
      ',',
    )}`,
    { stdio: 'inherit' },
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
