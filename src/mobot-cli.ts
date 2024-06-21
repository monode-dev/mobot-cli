#!/usr/bin/env node
// Commander Reference: https://www.npmjs.com/package/commander#common-option-types-boolean-and-value
import { program } from "commander";
import fs from "fs";
// import path from "path";
import { execSync } from "child_process";
import packageJson from "../package.json";

// Version & Program description
program
  .version(packageJson.version ?? `unknowns`, "-v", "Output the version number")
  .description("Creates, updates, and deploys Mobot projects");

// Sync the current project to GitHub
const localSettingsPath = `${__dirname}/localSettings.json`;
program
  .command(`upgrade`)
  .aliases([`update`, `up`, `u`])
  .description(`Upgrades tke cli to the latest version`)
  .action(async function () {
    console.log(`Updating Mobot CLI...`);
    const tag = fs.existsSync(localSettingsPath)
      ? JSON.parse(fs.readFileSync(localSettingsPath, `utf-8`)).tag
      : `latest`;
    execSync(`npm i -g mobot-cli@${tag}`);
    // Log new version number
    console.log(
      `Successfully updated to Mobot CLI v${process.env.npm_package_version}`,
    );
  });

// Run this program
program.parse(process.argv);
