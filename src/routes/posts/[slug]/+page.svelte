<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let { title, date, content } = $derived(data);
</script>

<svelte:head>
    <title>{title} | Posts | Zephiris.dev</title>
</svelte:head>

<h1>{title}</h1>
<svelte:component this={content} />
