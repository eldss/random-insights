const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// This was required in order to get i18n to compile correctly
//github.com/facebook/metro/issues/1064#issuecomment-1702824020
https: config.watcher.additionalExts.push("mjs", "cjs");

module.exports = config;
