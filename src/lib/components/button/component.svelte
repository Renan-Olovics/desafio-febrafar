<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {}
</script>

<button
	{...$$restProps}
	class="border-white2 text-textborder-primary hover:bg-white3 flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-md transition"
>
	<slot />
</button>
