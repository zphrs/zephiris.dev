<script>
    import { getAllPosts } from "./allPosts";
</script>

{#await getAllPosts() then posts}
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
{/await}
