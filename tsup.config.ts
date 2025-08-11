import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: "es2021",
  banner: {
    js: "#!/usr/bin/env node"
  }
});
