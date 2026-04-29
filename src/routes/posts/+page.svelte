<script lang="ts">
    import { getAllPosts } from "$lib/allPosts";
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    let { posts } = $derived(data);
</script>

<h1>Posts</h1>

<ul>
    {#each posts as { metadata: { title, description, date }, postPath }}
        <li>
            {new Date(date).toISOString().split("T")[0]}
            <a href={`/posts/${postPath}`}>
                {title}
            </a>
            <br />
            {description}
        </li>
    {/each}
</ul>
