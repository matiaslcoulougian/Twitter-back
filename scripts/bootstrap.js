// Preload dotenv
require('dotenv').config();

// Setup tsconfig path alias
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('../tsconfig.json');

let { baseUrl, paths } = tsConfig.compilerOptions;
tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: Object.keys(paths).reduce(
    (agg, key) => ({
      ...agg,
      [key]: paths[key].map((p) =>
        p.replace(
          tsConfig.compilerOptions.baseUrl,
          tsConfig.compilerOptions.outDir,
        ),
      ),
    }),
    {},
  ),
});

tsConfigPaths.register({ baseUrl, paths });
