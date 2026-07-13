// Builds the schematics into dist/ng-mapcn/schematics. Run after
// `ng build ng-mapcn` (which creates dist/ng-mapcn).
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const schematicsSrc = join(root, 'projects', 'ng-mapcn', 'schematics');
const outDir = join(root, 'dist', 'ng-mapcn', 'schematics');

execSync('node scripts/sync-schematic-files.mjs', { cwd: root, stdio: 'inherit' });
execSync('npx tsc -p projects/ng-mapcn/tsconfig.schematics.json', {
  cwd: root,
  stdio: 'inherit',
});

mkdirSync(outDir, { recursive: true });
cpSync(join(schematicsSrc, 'collection.json'), join(outDir, 'collection.json'));
cpSync(join(schematicsSrc, 'ng-add', 'schema.json'), join(outDir, 'ng-add', 'schema.json'));
cpSync(join(schematicsSrc, 'map', 'schema.json'), join(outDir, 'map', 'schema.json'));
cpSync(join(schematicsSrc, 'map', 'files'), join(outDir, 'map', 'files'), { recursive: true });

console.log(`Schematics built to ${outDir}`);
