<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "$lib/styles/reset.css";
    import "$lib/styles/base.css";
    import "$lib/styles/shiki.css";

    // Supports weights 200-800
    import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";
    // Supports weights 300-700
    import "@fontsource-variable/fira-code/wght.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta name="color-scheme" content="light dark" />
    <link
        rel="alternate"
        type="application/rss+xml"
        href="/feed.xml"
        title="Blog Posts"
    />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<header>
    <a href="/">zephiris.dev</a>
    <a href="/about">/about</a>
    <a href="/posts">/posts</a>
</header>

<main>
    {@render children()}
</main>

<footer>
    <fieldset>
        <legend>Other Places I Post</legend>
        <ul>
            <li>
                <a href="https://zephiris.me">Personal site: zephiris.me</a>
            </li>
            <li><a href="https://github.com/zphrs">GitHub (zphrs)</a></li>
            <li>
                <a href="https://tech.lgbt/@zphrs">Mastodon (zphrs@tech.lgbt)</a
                >
            </li>
        </ul>
    </fieldset>
</footer>

<style>
    footer {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        color: rgb(127, 127, 127);
    }
    main {
        min-height: 100dvh;
        max-width: 800px;
        margin: auto;
        padding: 1rem 0.5rem;
        padding-top: 0rem;
    }
    header {
        text-align: left;
        background-color: rgba(0, 0, 0, 0.2);
    }
    fieldset {
        border-radius: 0.5rem;
        border-width: 1px;
        border-color: currentColor;
        border-style: solid;
        outline: none;
    }
    header > a {
        padding: 0 1rem;
    }
    ul {
        color: gray;
    }
</style>
