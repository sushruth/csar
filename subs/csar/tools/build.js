const commonOptions = {
  bundle: true,
  sourcemap: "external",
  external: ["react"],
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
  target: ["node14"],
  outfile: "dist/index.cjs.js",
});

// MODULE field
buildAndAnalyze({
  entryPoints: ["./src/index.ts"],
  format: "esm",
  target: ["esnext"],
  outfile: "dist/index.esm.js",
});