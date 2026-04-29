import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
// import { createHighlighter } from "@bitmachina/highlighter";
import { createHighlighter } from "shiki";
import forestCottageClassyDark from "./static/themes/forest-cottage-classy-dark.js";
import forestCottageClassyLight from "./static/themes/forest-cottage-classy-light.js";
const highlighter = await createHighlighter({
  langs: ["rs", "swift"],
  themes: [forestCottageClassyLight, forestCottageClassyDark],
});

await highlighter.loadTheme(forestCottageClassyDark);
await highlighter.loadTheme(forestCottageClassyLight);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules")
        ? undefined
        : filename.includes("routes/posts")
          ? undefined
          : true,
  },
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    inlineStyleThreshold: 8064,
  },
  preprocess: [
    mdsvex({
      extensions: [".svx", ".md"],
      // mdsvex.config.js
      highlight: {
        highlighter: (code, lang) => {
          const html = highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: forestCottageClassyLight,
              dark: forestCottageClassyDark,
            },
          });

          return `{@html \`${html}\`}`;
        },
      },
    }),
  ],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
