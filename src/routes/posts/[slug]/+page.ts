import type { PageLoad } from "./$types";
import type { BlogPostMetadata } from "$lib/allPosts";

export const load: PageLoad = async ({ params }) => {
  const post = await import(`../${params.slug}.svx`);
  const metadata: BlogPostMetadata = post.metadata;
  const content = post.default;

  return {
    ...metadata,
    content,
  };
};
