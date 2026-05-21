const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const assetDir = path.join(rootDir, "assets");
const publicAssetDir = path.join(publicDir, "assets");

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicAssetDir, { recursive: true });

["index.html", "styles.css", "app.js"].forEach((file) => {
  copyFile(path.join(rootDir, file), path.join(publicDir, file));
});

fs.readdirSync(assetDir)
  .filter((file) => /\.(png|jpg|jpeg|svg|webp)$/i.test(file))
  .forEach((file) => {
    copyFile(path.join(assetDir, file), path.join(publicAssetDir, file));
  });

console.log("Static site built into public/");
