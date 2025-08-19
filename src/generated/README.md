# Generated Types

This directory (`src/generated/`) contains **auto-generated TypeScript types** from the TMDB OpenAPI specification.

## 🚫 Do Not Edit

Files in this folder are overwritten by the code generation step. Any manual changes will be lost.

## Files

- `tmdb.ts` — TypeScript definitions for TMDB API endpoints, request/response types, and schemas.

## How to Regenerate

> This project **does not** auto-download the spec during `codegen`. Keep a local spec file in `openapi/`.

1. Ensure the TMDB OpenAPI spec exists locally at **one** of:
   - `openapi/tmdb.v3.yaml` (preferred), or
   - `openapi/tmdb.v3.json`

2. Run the codegen script:

   Using pnpm:
   ```bash
   pnpm codegen
   ```

   Using npm:
   ```bash
   npm run codegen
   ```

This will write `src/generated/tmdb.ts`.

## Optional: Download the Spec Manually

If you want to fetch the latest spec from the web, use the provided convenience script:

```bash
pnpm run codegen:url
```

This will **download and generate** types from:
`https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/themoviedb.org/3/openapi.yaml`

Alternatively, you can generate from your local spec explicitly:

```bash
pnpm run codegen:local
```

## Dependencies

Dev dependencies required for codegen:

```bash
pnpm add -D openapi-typescript tsx
```

## Usage (internal only)

These generated types are intended for **internal** use by the SDK. Prefer creating curated, public-facing aliases in `src/modules/*/types.ts` rather than exporting the entire generated module.

Example (inside a module types file):

```ts
import type { paths, components } from "../../generated/tmdb";

// Raw response type for GET /3/movie/{movie_id}
export type GetMovieResponse =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

// Public alias for consumers
export type Movie = GetMovieResponse;

// Direct schema reference if needed
export type Genre = components["schemas"]["Genre"];
```

## Troubleshooting

- **“Unsupported schema format, expected `openapi: 3.x`”**
  - Ensure your local spec is valid OpenAPI **3.x** (`"openapi": "3.x.y"` at the root).
  - If you have a Swagger 2.0 spec, convert it to OA3 before running codegen.

- **ESM/TypeScript execution errors**
  - Use `tsx` to run the script: `pnpm codegen` (as configured above).

- **Type changes after regeneration**
  - The upstream TMDB spec may have changed. Update your curated types accordingly.

## Versioning

- **Source spec**: `openapi/tmdb.v3.yaml` or `openapi/tmdb.v3.json`
- **Generator**: `openapi-typescript` v7
- **Output**: `src/generated/tmdb.ts` (overwritten on each run)
