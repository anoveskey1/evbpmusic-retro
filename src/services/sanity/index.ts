import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: `${process.env.VITE_EVBP_MUSIC_SANITY_PROJECT_ID}`,
  dataset: `${process.env.VITE_EVBP_MUSIC_SANITY_DATASET}`,
  apiVersion: `${process.env.VITE_EVBP_MUSIC_SANITY_API_VERSION}`,
  useCdn: true,
});

export default sanityClient;
