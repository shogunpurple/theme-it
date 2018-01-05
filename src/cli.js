#! /usr/bin/env node
const { generateCSSFromThemeObj } = require("./themeCompiler");
const fs = require("fs");

const args = process.argv.slice(2);

if (args.length < 2) {
    throw new Error("You must provide 2 arguments to the theme-it CLI. The path of the JSON file you want to parse and the name of the generated CSS file")
}

const [path, cssFile] = args;

const themeConfig = JSON.parse(fs.readFileSync(path, "utf8"));

fs.writeFileSync(cssFile, generateCSSFromThemeObj(themeConfig));

console.log("theme-it CSS file generated successfully!")
