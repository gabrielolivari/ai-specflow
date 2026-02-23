import fs from "node:fs";
import path from "node:path";

const MARKER_START = "<!-- ai-specflow:start -->";
const MARKER_END = "<!-- ai-specflow:end -->";

function ensureDir(dirPath, dryRun) {
  if (dryRun) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, contents, dryRun) {
  if (dryRun) {
    return;
  }
  fs.writeFileSync(filePath, contents, "utf8");
}

function listFilesRecursive(baseDir) {
  const files = [];
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function mergeManagedBlock(existingContent, managedContent) {
  const managedBlock = `${MARKER_START}\n${managedContent.trimEnd()}\n${MARKER_END}\n`;

  if (
    existingContent.includes(MARKER_START) &&
    existingContent.includes(MARKER_END)
  ) {
    const pattern = new RegExp(
      `${MARKER_START}[\\s\\S]*?${MARKER_END}\\n?`,
      "m"
    );
    return existingContent.replace(pattern, managedBlock);
  }

  const separator = existingContent.endsWith("\n") ? "\n" : "\n\n";
  return `${existingContent}${separator}${managedBlock}`;
}

function copyTree({ sourceRoot, targetRoot, dryRun, force }) {
  const created = [];
  const skipped = [];
  const updated = [];

  const sourceFiles = listFilesRecursive(sourceRoot);
  for (const sourceFile of sourceFiles) {
    const relativePath = path.relative(sourceRoot, sourceFile);
    const targetFile = path.join(targetRoot, relativePath);
    const targetDir = path.dirname(targetFile);

    ensureDir(targetDir, dryRun);

    const targetExists = fs.existsSync(targetFile);
    if (targetExists && !force) {
      skipped.push(relativePath);
      continue;
    }

    const contents = readText(sourceFile);
    writeText(targetFile, contents, dryRun);

    if (targetExists) {
      updated.push(relativePath);
    } else {
      created.push(relativePath);
    }
  }

  return { created, skipped, updated };
}

function upsertWrapper({ packageRoot, target, dryRun, wrapperFile }) {
  const sourcePath = path.join(packageRoot, wrapperFile);
  const targetPath = path.join(target, wrapperFile);
  const templateContent = readText(sourcePath);

  if (!fs.existsSync(targetPath)) {
    writeText(targetPath, templateContent, dryRun);
    return "created";
  }

  const existing = readText(targetPath);
  const merged = mergeManagedBlock(existing, templateContent);
  writeText(targetPath, merged, dryRun);
  return "merged";
}

function installProviders({ packageRoot, target, dryRun, force, providers }) {
  const providerMap = {
    claude: {
      wrappers: ["CLAUDE.md"],
      dirs: [".claude"],
    },
    cursor: {
      wrappers: ["AGENTS.md"],
      dirs: [".cursor"],
    },
    codex: {
      wrappers: ["codex.md"],
      dirs: [],
    },
    gemini: {
      wrappers: ["GEMINI.md"],
      dirs: [],
    },
  };

  const result = {
    enabled: [],
    wrappersCreated: [],
    wrappersMerged: [],
    dirs: [],
  };

  for (const [provider, enabled] of Object.entries(providers)) {
    if (!enabled) {
      continue;
    }

    result.enabled.push(provider);
    const config = providerMap[provider];

    for (const wrapper of config.wrappers) {
      const wrapperStatus = upsertWrapper({
        packageRoot,
        target,
        dryRun,
        wrapperFile: wrapper,
      });
      if (wrapperStatus === "created") {
        result.wrappersCreated.push(wrapper);
      } else {
        result.wrappersMerged.push(wrapper);
      }
    }

    for (const providerDir of config.dirs) {
      const sourceDir = path.join(packageRoot, providerDir);
      if (!fs.existsSync(sourceDir)) {
        continue;
      }
      const targetDir = path.join(target, providerDir);
      const dirCopyResult = copyTree({
        sourceRoot: sourceDir,
        targetRoot: targetDir,
        dryRun,
        force,
      });
      result.dirs.push({
        provider,
        dir: providerDir,
        ...dirCopyResult,
      });
    }
  }

  return result;
}

export async function runInit({
  packageRoot,
  target,
  dryRun,
  force,
  providers,
}) {
  const aiSource = path.join(packageRoot, ".ai");
  const docsSource = path.join(packageRoot, "docs", "sdd");

  if (!fs.existsSync(aiSource) || !fs.existsSync(docsSource)) {
    throw new Error("Missing .ai/ and docs/sdd/ sources inside the package.");
  }

  const aiTarget = path.join(target, ".ai");
  const docsTarget = path.join(target, "docs", "sdd");

  ensureDir(aiTarget, dryRun);
  ensureDir(docsTarget, dryRun);

  const aiResult = copyTree({
    sourceRoot: aiSource,
    targetRoot: aiTarget,
    dryRun,
    force,
  });
  const docsResult = copyTree({
    sourceRoot: docsSource,
    targetRoot: docsTarget,
    dryRun,
    force,
  });

  const providersResult = installProviders({
    packageRoot,
    target,
    dryRun,
    force,
    providers,
  });

  const mode = dryRun ? "DRY-RUN" : "APPLIED";
  console.log(`[ai-specflow] ${mode}`);
  console.log(`[ai-specflow] target: ${target}`);
  console.log(
    `[ai-specflow] .ai -> created:${aiResult.created.length} updated:${aiResult.updated.length} skipped:${aiResult.skipped.length}`
  );
  console.log(
    `[ai-specflow] docs/sdd -> created:${docsResult.created.length} updated:${docsResult.updated.length} skipped:${docsResult.skipped.length}`
  );

  if (providersResult.enabled.length === 0) {
    console.log("[ai-specflow] providers -> none selected");
  } else {
    console.log(
      `[ai-specflow] providers -> ${providersResult.enabled.join(", ")}`
    );
    console.log(
      `[ai-specflow] wrappers root -> created:${providersResult.wrappersCreated.length} merged:${providersResult.wrappersMerged.length}`
    );
    for (const providerDirResult of providersResult.dirs) {
      console.log(
        `[ai-specflow] ${providerDirResult.dir} (${providerDirResult.provider}) -> created:${providerDirResult.created.length} updated:${providerDirResult.updated.length} skipped:${providerDirResult.skipped.length}`
      );
    }
  }

  if (dryRun) {
    console.log("[ai-specflow] Run again without --dry-run to write files.");
  }
}
