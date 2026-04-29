<script lang="ts">
    import { getAllPosts } from "$lib/allPosts";
    import Posts from "$lib/Posts.svelte";
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    let { posts } = $derived(data);
</script>

<svelte:head>
    <title>Posts | Zephiris.dev</title>
</svelte:head>

<h1>Posts</h1>

<Posts {posts} />
