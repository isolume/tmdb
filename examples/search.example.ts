import { TMDB } from "@vo1x/tmdb";
import type { MultiSearchResult } from "@vo1x/tmdb";

async function main() {
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
    language: "en-US",
  });

  // Movie search
  const movieRes = await tmdb.search.movie("batman", { page: 1, include_adult: false });
  console.log(
    `\n[Movie] total_results=${movieRes.total_results} page=${movieRes.page}/${movieRes.total_pages}`
  );
  movieRes.results.slice(0, 5).forEach((m, i) => {
    console.log(`  #${i + 1}: ${m.title ?? "(untitled)"} (id=${m.id})`);
  });

  // TV search
  const tvRes = await tmdb.search.tv("batman", { page: 1 });
  console.log(
    `\n[TV] total_results=${tvRes.total_results} page=${tvRes.page}/${tvRes.total_pages}`
  );
  tvRes.results.slice(0, 5).forEach((t, i) => {
    console.log(`  #${i + 1}: ${t.name ?? "(unnamed)"} (id=${t.id})`);
  });

  // People search
  const peopleRes = await tmdb.search.people("batman", { page: 1 });
  console.log(
    `\n[People] total_results=${peopleRes.total_results} page=${peopleRes.page}/${peopleRes.total_pages}`
  );
  peopleRes.results.slice(0, 5).forEach((p, i) => {
    console.log(`  #${i + 1}: ${p.name ?? "(unknown)"} (id=${p.id})`);
  });

  // Multi search (mixed movie/tv/person)
  const multiRes = await tmdb.search.multi("batman", { page: 1, include_adult: false });
  console.log(
    `\n[Multi] total_results=${multiRes.total_results} page=${multiRes.page}/${multiRes.total_pages}`
  );
  multiRes.results.slice(0, 5).forEach((r: MultiSearchResult, i: number) => {
    const label = r.media_type === "movie" ? r.title : r.media_type === "tv" ? r.title : r.title;
    console.log(`  #${i + 1}: [${r.media_type}] ${label ?? "(unknown)"} (id=${r.id})`);
  });
}

main().catch((err) => {
  console.error("TMDB search example failed:", err);
});
