import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_EMAIL,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL,
} from "$lib/blogMetadata";
import { getAllPosts } from "$lib/allPosts";
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
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import { read } from "$app/server";
export const prerender = true;

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeFormat)
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeStringify);

async function getHtmlForPost(postPath: string): Promise<string> {
  /* @vite-ignore */
  let text = await import(`../posts/${postPath}/+page.svx?raw`).then(
    (m) => m.default,
  );
  const file = await processor.process(text);
  return file.value as string;
}

// prettier-ignore
async function getRssXml(): Promise<string> {
  const allPosts = await getAllPosts();
  const rssUrl = `${BLOG_URL}feed.xml`;
  const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('rss', {
    "xmlns:atom": 'http://www.w3.org/2005/Atom',
    version: "2.0"
  })
    .ele('atom:link', { rel: 'self', href: rssUrl, type: "application/rss+xml" }).up()
    .ele('title').txt(BLOG_TITLE).up()
    .ele('link', { href: BLOG_URL }).up()
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
