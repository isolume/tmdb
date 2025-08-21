import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  minify: false,
  target: "es2022",
  external: ["node:*"],
});
