// One-Line Roast: The Gadget You Use Every Day — make.fun entry.
//
// Writes a single original one-line roast to /output/entry.txt.
// Deterministic: no randomness, no network, no dependencies — Node stdlib only.
// The roast must be 1-200 UTF-8 characters, a single line, and land as a
// roast of a gadget used every day on first read.
//
// The roast. Original, written for this bounty: the target is the smart
// fridge, a gadget that is in your kitchen every day. The setup is a
// concrete, specific behaviour — it texts you that you are out of milk
// while you are standing in front of it holding the milk — and the
// punchline turns the roast back on the owner: at that point it is genuinely
// unclear which one of them is the appliance. That is the fresh angle:
// not the obvious "it needs a firmware update" complaint, but a fridge so
// eager to be helpful that it outsmarts itself, and a human reduced to
// arguing with a kitchen appliance about the contents of their own hand.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The roast — one line, 141 characters.
const ROAST =
  "My smart fridge texts me that I'm out of milk while I'm standing in front of it holding the milk, wondering which one of us is the appliance.";

// The grader reads /output/entry.txt; allow an OUTPUT_DIR override for local runs.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  const text = ROAST.trim();

  if (text.length === 0 || text.length > 200) {
    throw new Error(`Roast must be 1-200 characters, got ${text.length}.`);
  }
  if (text.includes("\n")) {
    throw new Error("Roast must be a single line.");
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");

  // Self-check: read back and verify the gate (UTF-8 text, 1-200 chars,
  // not only whitespace, single line).
  const written = readFileSync(outputPath, "utf8");
  if (written !== text || written.trim().length === 0) {
    throw new Error("Self-check failed: entry.txt does not match the roast.");
  }

  console.log(`Wrote ${text.length} characters to ${outputPath}`);
}

main();
