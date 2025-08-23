import { TMDB, type Person, type PersonImages, type PersonCombinedCredits } from "@vo1x/tmdb";

/**
 * A minimal example demonstrating how to use the Person service.
 */
async function main() {
  const tmdb = new TMDB({
    apiKey: process.env.TMDB_TOKEN!,
    language: "en-US",
  });

  const personId = 287; // Christian Bale

  const person: Person = await tmdb.person.get(personId);
  const images: PersonImages = await tmdb.person.images(personId);
  const credits: PersonCombinedCredits = await tmdb.person.combinedCredits(personId);

  console.log({
    name: person.name,
    knownFor: person.knownForDepartment,
    profileImageCount: images.profiles?.length,
    totalCastCredits: credits.cast?.length,
  });
}

main().catch((err) => {
  console.error("An error occurred:", err.message);
});
