<script lang="ts">
    import { BLOG_AUTHOR } from "$lib/blogMetadata";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { title, date, description, content } = $derived(data);
</script>

<svelte:head>
    <title>{title} | Posts | Zephiris.dev</title>
    <meta property="og:title" content={title} />
    <meta property="og:type" content="article" />
    <meta property="og:description" content={description} />
    <meta property="og:article:published_time" content={date} />
    <meta property="og:article:author" content={BLOG_AUTHOR} />
</svelte:head>

<h1>{title}</h1>
<svelte:component this={content} />
