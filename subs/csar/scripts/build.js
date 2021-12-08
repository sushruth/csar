const { name, peerDependencies } = require("../package.json");

const commonOptions = {
  bundle: true,
  sourcemap: "external",
  external: Object.keys(peerDependencies),
  metafile: true,
  minify: process.argv.includes("--minify"),
};

const esbuild = require("esbuild");

async function buildAndAnalyze(options) {
  const result = await esbuild.build({
    ...commonOptions,
    ...options,
  });

  const text = await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  });

  console.log(text);
}

// MAIN field
buildAndAnalyze({
  entryPoints: ["./src/index.ts"],
  format: "cjs",
  target: ["es2015"],
  outfile: "dist/index.cjs.js",
});

// MODULE field
buildAndAnalyze({
  entryPoints: ["./src/index.ts"],
  format: "esm",
  platform: "browser",
  target: ["es2018"],
  outfile: "dist/index.esm.js",
});
