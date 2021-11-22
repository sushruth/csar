const commonOptions = {
  bundle: true,
  sourcemap: "external",
  external: ["react"],
  metafile: true,
  minify: process.argv.includes("--minify"),
};

async function buildAndAnalyze(options) {
  let esbuild = require("esbuild");

  let result = await esbuild.build({
    ...commonOptions,
    ...options,
  });

  let text = await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  });

  console.log(text);
}

// MAIN field
buildAndAnalyze({
  entryPoints: ["./src/index.ts"],
  format: "cjs",
  target: ["node14"],
  outfile: "dist/index.cjs.js",
});

// MODULE field
buildAndAnalyze({
  entryPoints: ["./src/index.ts"],
  format: "esm",
  target: ["node14"],
  outfile: "dist/index.esm.js",
});