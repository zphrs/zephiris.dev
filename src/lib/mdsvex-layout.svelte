<script>
    let { title, author, date, children } = $props();
</script>

<svelte:head>
    <title>{title} | Zephiris.dev</title>
</svelte:head>

<h1>{title}</h1>
<p class="date">on: {date}</p>
<p class="date">by: {author}</p>
{@render children()}
