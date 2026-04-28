import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_EMAIL,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL,
} from "$lib/blogMetadata";
import { create } from "xmlbuilder2";

import rehypeFormat from "rehype-format";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { read } from "$app/server";

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeFormat)
  .use(rehypeSanitize)
  .use(rehypeStringify);

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

async function getAllPosts(): Promise<PostLink[]> {
  const pathPrefix = "../posts/";
  const allPostFiles = import.meta.glob("../posts/*.svx");
  const iterablePostFiles = Object.entries(allPostFiles);
  const postJobs = iterablePostFiles.map(async ([path, resolver]) => {
    const { metadata } = (await resolver()) as { metadata: BlogPostMetadata };
    const postPath = path.replace(pathPrefix, "").replace(".svx", "");
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

async function getHtmlForPost(postPath: string): Promise<string> {
  const value = import.meta.resolve(`../posts/${postPath}.svx?raw`);
  /* @vite-ignore */
  let text = await import(`../posts/${postPath}.svx?raw`).then(
    (m) => m.default,
  );
  console.log("AAA", text);
  const file = await processor.process(text);
  return file.value as string;
}

// prettier-ignore
async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts();
  const rssUrl = `${BLOG_URL}/rss.xml`;
  const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('feed', {
    xmlns: 'http://www.w3.org/2005/Atom',
  })
    .ele('title').txt(BLOG_TITLE).up()
    .ele('link', { href: BLOG_URL }).up()
    .ele('link', { rel: 'self', href: rssUrl }).up()
    .ele('updated').txt(new Date().toISOString()).up()
    .ele('id').txt(BLOG_URL).up()
    .ele('author')
      .ele('name').txt(BLOG_AUTHOR).up()
      .ele('email').txt(BLOG_AUTHOR_EMAIL).up()
    .up()
    .ele('subtitle').txt(BLOG_DESCRIPTION).up()

  for (const post of allPosts) {
    const pubDate = post.metadata.date;
    const postUrl = `${BLOG_URL}/posts/${post.postPath}`;
    const postHtml = await getHtmlForPost(post.postPath);
    const summary = post.metadata.description;

    root
      .ele('entry')
      .ele('title').txt(post.metadata.title).up()
      .ele('link', { href: postUrl }).up()
      .ele('updated').txt(pubDate).up()
      .ele('id').txt(postUrl).up()
      .ele('content', {type: "html"}).txt(postHtml).up()
      .ele('summary').txt(summary).up()
      .up();
  }
  return root.end();
}

export async function GET() {
  const headers = {
    "Cache-Control": "max-age=0, s-maxage=3600",
    "Content-Type": "application/xml",
  };
  return new Response(await getRssXml(), { headers });
}
