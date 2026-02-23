#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInit } from "../scripts/init-specflow.js";

function printHelp() {
  console.log(`ai-specflow

Usage:
  ai-specflow init [options]
  ai-specflow --help

Options:
  --target <path>         Target project path (default: cwd)
  --dry-run               Preview changes without writing files
  --force                 Overwrite existing scaffold files
  --with-claude           Include CLAUDE.md and .claude/
  --with-cursor           Include AGENTS.md and .cursor/
  --with-codex            Include codex.md
  --with-gemini           Include GEMINI.md
  --with-all              Include Claude, Cursor, Codex, and Gemini
  --help                  Show this help
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    process.exit(0);
  }

  if (command !== "init") {
    console.error(`Unsupported command: ${command}`);
    printHelp();
    process.exit(1);
  }

  const options = {
    target: process.cwd(),
    dryRun: false,
    force: false,
    providers: {
      claude: false,
      cursor: false,
      codex: false,
      gemini: false,
    },
  };

  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--with-claude") {
      options.providers.claude = true;
      continue;
    }
    if (arg === "--with-cursor") {
      options.providers.cursor = true;
      continue;
    }
    if (arg === "--with-codex") {
      options.providers.codex = true;
      continue;
    }
    if (arg === "--with-gemini") {
      options.providers.gemini = true;
      continue;
    }
    if (arg === "--with-all") {
      options.providers = {
        claude: true,
        cursor: true,
        codex: true,
        gemini: true,
      };
      continue;
    }
    if (arg === "--target") {
      const value = args[i + 1];
      if (!value) {
        console.error("Missing value for --target");
        process.exit(1);
      }
      options.target = path.resolve(value);
      i += 1;
      continue;
    }

    console.error(`Unsupported option: ${arg}`);
    printHelp();
    process.exit(1);
  }

  const packageRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".."
  );

  await runInit({
    packageRoot,
    ...options,
  });
}

main().catch((error) => {
  console.error("Error running ai-specflow init:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
