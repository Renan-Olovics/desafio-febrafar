<script lang="ts">
	import Search from '$lib/components/icons/search.svelte';

	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {}
	export let value: string = '';
</script>

<div class="relative">
	<input
		bind:value
		{...$$restProps}
		class="border-white2 text-secondary focus:border-primary focus:ring-textborder-primary w-48 rounded-lg border bg-white px-4 py-2 pr-10 shadow-md transition"
	/>
	<Search />
</div>
