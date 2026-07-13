import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

const version = JSON.parse(readFileSync('./projects/ng-mapcn/package.json', 'utf-8')).version;
const tgz = `./dist/ng-mapcn/ng-mapcn-${version}.tgz`;

run('npm run build:lib:prod');
run('cd dist/ng-mapcn && npm pack');
run(`npm install ${tgz} --no-save`);
run('npm run build:demo');
