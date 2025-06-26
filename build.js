const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['auth.ts'],
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  globalName: 'Auth', 
  outfile: 'dist/auth.min.js',
}).catch(() => process.exit(1));
