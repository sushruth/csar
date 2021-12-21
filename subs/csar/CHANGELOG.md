## 0.2.1
**Date:** 20 December 2021

- Fixed types

## 0.2.0
**Date:** 16 December 2021

- Added a feature to customize equality check for selector results
- Updated README with new instructions

## 0.1.1
**Date:** 9 December 2021

- Performance improvements
  - saves calculated initial values in the first run now.
  - Uses `useState` instead of `useReducer` internally - somehow this is less blocking

## 0.1.0
**Date:** 7 December 2021

No changes in features

- Dropping esbuild target to `es2015` for `cjs`
- Dropping esbuild target to `es2017` for `esm`

for wider support

## 0.0.6
**Date:** 7 December 2021

No changes in features

- Removing UMD export since webpack defaults to that and it fails PROD builds when `NODE_ENV` is used as per documentation

## 0.0.4
**Date:** 5 December 2021

### `csar`

This is mostly a maintenance release. No changes in features.

- Reverting ESM export file extension to support older webpack versions
- Adding UMD export with `"browser"` field with the global export named `csar`.
- Calculating externals dynamically during build
- Renaming `tools` to `scripts`

## 0.0.3
**Date:** 5 December 2021

### `csar`

This is mostly a maintenance release. No changes in features.

- Improved ESM export

## 0.0.2
**Date:** 5 December 2021

### `csar`

This is mostly a maintenance release. No changes in features.

- Updated information in `package.json`
- Using `.mjs` extension for the `"module"` export
- Improved `tsconfig` usage for test files and source files.

### Demo-site

- Moving to `webpack` from `parcel` to reduce unplugged packages in yarn

## 0.0.1
**Date:** 4 December 2021

- Initial Release

