'use strict';
const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');
const packageConfig = require('../package.json');

function exec(cmd) {
  return require('child_process').execSync(cmd).toString().trim();
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
];

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm,
  });
}

module.exports = function () {
  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name +
          ': ' +
          chalk.red(mod.currentVersion) +
          ' should be ' +
          chalk.green(mod.versionRequirement)
      );
    }
  }

  if (warnings.length) {
    console.log(
      chalk.yellow(
        '要使用此模板，必须将以下内容更新到模块:'
      )
    );
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log('  ' + warning);
    }

    console.log();
    process.exit(1);
  }
};
