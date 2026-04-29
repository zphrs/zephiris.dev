import { getAllPosts } from "$lib/allPosts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params: _params }) => {
  return {
    posts: await getAllPosts(),
  };
};
