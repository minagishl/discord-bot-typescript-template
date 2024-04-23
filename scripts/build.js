const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('./src/**/*.ts');

const config = {
  entryPoints,
  outdir: './dist',
  platform: 'node',
  minify: true,
};

build({
  ...config,
});
