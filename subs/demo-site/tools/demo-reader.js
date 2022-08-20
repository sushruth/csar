// @ts-check
const { existsSync, lstatSync, readFileSync } = require('fs')
const { readdir } = require('fs/promises')
const { resolve, relative, join, sep } = require('path')

async function getDemoContents() {
  /** @type {Record<string, string>} */
  const result = {}

  const demoDir = resolve(__dirname, '../src/demo')

  async function walk(start = demoDir) {
    const dirContents = await readdir(start)
    for (const item of dirContents) {
      const path = join(start, item)
      if (existsSync(path) && lstatSync(path).isDirectory()) {
        await walk(path)
      } else {
        const rel = relative(demoDir, path)
        const entryKey = `/${rel.replace(sep, '/')}`
        const fileContent = readFileSync(path, 'utf8')

        Object.assign(result, { [entryKey]: JSON.stringify(fileContent) })
      }
    }
  }

  await walk()

  return result
}

module.exports = {
  getDemoContents,
}
