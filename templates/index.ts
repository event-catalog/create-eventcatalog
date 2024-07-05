import { copy } from "../helpers/copy";
import { install } from "../helpers/install";

import os from "os";
import fs from "fs";
import path from "path";
import chalk from "chalk";

import { GetTemplateFileArgs, InstallTemplateArgs } from "./types";

/**
 * Get the file path for a given file in a template, e.g. "next.config.js".
 */
export const getTemplateFile = ({
  template,
  mode,
  file,
}: GetTemplateFileArgs): string => {
  return path.join(__dirname, template, mode, file);
};

/**
 * Install a Next.js internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  mode,
  eslint,
}: InstallTemplateArgs) => {
  console.log(chalk.bold(`Using ${packageManager}.`));

  /**
   * Create a package.json for the new project
   */
  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      start: "eventcatalog start",
      dev: "eventcatalog dev",
      build: "eventcatalog build",
      generate: "eventcatalog generate",
      test: 'echo "Error: no test specified" && exit 1',
    },
    dependencies: {
      "@eventcatalog/core": "latest"
    }
  };
  /**
   * Write it to disk.
   */
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );
  /**
   * These flags will be passed to `install()`, which calls the package manager
   * install process.
   */
  const installFlags = { packageManager, isOnline };

  /**
   * Default dependencies.
   */
  // const dependencies = ["@eventcatalog/eventcatalog-2"];
  const dependencies = [] as any;
  // "@myuser/my-package": "file:../lib"
  const devDependencies = [
    "@parcel/watcher",
    "concurrently",
  ] as any;

  /**
   * Install package.json dependencies if they exist.
   */
  if (dependencies.length) {
    console.log();
    console.log("Installing dependencies:");
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`);
    }
    console.log();

    await install(root, dependencies, installFlags);
  }

  if (devDependencies.length) {
    console.log();
    console.log("Installing devDependencies:");
    for (const devDependency of devDependencies) {
      // console.log(`- ${chalk.cyan(devDependency)}`);
    }

    const devInstallFlags = { devDependencies: true, ...installFlags };
    await install(root, devDependencies, devInstallFlags);
  }
  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, "../templates", template);
  // console.log("templatePath", templatePath, __dirname, template);
  await copy("**", root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case "env":
        case "gitignore":
        case "dockerignore":
        case "eslintrc.json": {
          return ".".concat(name);
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  if (!eslint) {
    // remove un-necessary template file if eslint is not desired
    await fs.promises.unlink(path.join(root, ".eslintrc.json"));
  }
};

export * from "./types";
