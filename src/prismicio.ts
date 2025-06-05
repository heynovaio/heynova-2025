import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
// Option B: Fix the resolver - only use this if your insight documents
// have a field that links to insights_categories documents

// Remove the problematic insight route from Prismic routes
// Let Next.js handle the dynamic routing instead

const routes: Route[] = [
  { type: "page", path: "/:lang?", uid: "home" },
  { type: "page", path: "/:lang?/:uid" },
  { type: "team", path: "/:lang?/team" },
  { type: "contact", path: "/:lang?/contact" },

  // Insights routes
  { type: "insights_listing", path: "/:lang?/insights" },
  {
    type: "insights_categories",
    path: "/:lang?/insights/:uid", // Keep this simple
  },
  // Services routes
  { type: "services_listing", path: "/:lang?/services" },
  { type: "service", path: "/:lang?/services/:uid" },
];

export async function debugRoutes() {
  const client = createClient();

  // Test fetching an insight document
  try {
    const insights = await client.getAllByType("insight", { limit: 1 });
    const insight = insights[0];

    console.log("Sample insight:", {
      uid: insight.uid,
      url: insight.url,
      lang: insight.lang,
      categories: insight.data.categories,
    });

    // Test the URL generation
    console.log("Generated URL:", insight.url);
  } catch (error) {
    console.error("Error fetching insights:", error);
  }
}

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
