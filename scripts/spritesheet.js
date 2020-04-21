"use strict";

// Load in dependencies
const spritesmith = require("spritesmith");
const fs = require("fs");
const util = require("util");

spritesmith.run = util.promisify(spritesmith.run);
fs.writeFile = util.promisify(fs.writeFile);
fs.readdir = util.promisify(fs.readdir);

// Generate spritesheet
(async () => {
  const sprites = (await fs.readdir("asset/image"))
    .filter(f => /^.+[0-9]+\.png$/i.test(f))
    .map(f => `asset/image/${f}`);

  const result = await spritesmith.run({src: sprites});
  await fs.writeFile("asset/sprites.png", result.image);
  const coords = {};
  for (const [file, coord] of Object.entries(result.coordinates)) {
    coords[file.replace("asset/image/", "").replace(".png", "")] = coord;
  }
  await fs.writeFile("src/sprites.js", `export default ${JSON.stringify(coords)}`);
})();
