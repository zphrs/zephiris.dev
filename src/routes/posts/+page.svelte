<script lang="ts">
    import { getAllPosts } from "$lib/allPosts";
    import Posts from "$lib/Posts.svelte";
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    let { posts } = $derived(data);
</script>

<svelte:head>
    <title>Posts | Zephiris.dev</title>
    <meta name="description" content="list of Zephiris.dev posts" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Posts | Zephiris.dev" />
    <meta property="og:description" content="list of Zephiris.dev posts" />
    <meta property="og:image" content="/favicon.svg" />
    <meta property="og:image:type" content="image/svg" />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="300" />
    <meta property="og:image:alt" content="Zephiris.dev logo" />
</svelte:head>

<h1>Posts</h1>

<Posts {posts} />
