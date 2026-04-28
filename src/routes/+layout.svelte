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
</svelte:head>

<header>
    <h1>Zephiris.dev</h1>
</header>

<main>
    {@render children()}
</main>

<hr />
<footer>
    <ul>
        <li><a href="https://zephiris.me">Personal site: zephiris.me</a></li>
        <li><a href="https://github.com/zphrs">GitHub (zphrs)</a></li>
    </ul>
</footer>

<style>
    main {
        min-height: 100dvh;
        max-width: 800px;
        margin: auto;
        padding: 0.5rem;
    }
</style>
