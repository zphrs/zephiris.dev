<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "$lib/styles/reset.css";
    import "$lib/styles/base.css";

    // Supports weights 200-800
    import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
