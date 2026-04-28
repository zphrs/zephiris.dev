export type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  image?: string;
  caption?: string;
  keywords?: string;
};

export type PostLink = {
  metadata: BlogPostMetadata;
  postPath: string;
};

export async function getAllPosts(): Promise<PostLink[]> {
  const pathPrefix = "../routes/posts/";
  const allPostFiles = import.meta.glob("../routes/posts/*/+page.svx");
  const iterablePostFiles = Object.entries(allPostFiles);
  const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
    const postPath = path.replace(pathPrefix, "").replace("/+page.svx", "");
    return { metadata, postPath };
  });
  const posts = await Promise.all(postJobs);
  posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
  return posts;
}
