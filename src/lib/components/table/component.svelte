<script lang="ts">
	import ArrowButton from '../icons/arrow-button.svelte';
	export let titles: {
		title: string;
		icon?: any;
	}[] = [];

	type Rows = {
		tds: {
			description: string;
			secondaryDescription?: string;
		}[];
	}[];
	export let rows: Rows = [];
	export let totalPages = 0;
	export let currentPage = 1;
	export let onPageChange: (page: number) => void;

	let numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

	let initialSlice = 1;
	let finalSlice = 10;

	$: {
		if (currentPage > 6 && currentPage < totalPages - 1) {
			initialSlice = currentPage - 5;
			finalSlice = currentPage + 4;
		}

		if (currentPage === totalPages) {
			initialSlice = totalPages - 9;
			finalSlice = totalPages;
		}
		if (currentPage < 6) {
			initialSlice = 1;
			finalSlice = 10;
		}
	}
</script>

<table class="min-w-[1000px] border-separate border-spacing-y-4 shadow-xl">
	<thead class="rounded-t-lg bg-[#F1F5F9]">
		<tr class="">
			{#each titles as data}
				<th
					class="border-b border-[#E0E7FF] p-3 text-left text-[#2D3E50]
					first:rounded-tl-lg last:rounded-tr-lg
					{data.icon ? 'flex items-center' : ''}
					"
				>
					{data.title}
					{#if data.icon}
						<svelte:component this={data.icon} />
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="">
		{#each rows as row}
			<tr class="group h-16 max-h-16 odd:bg-[#FFFFFF] even:bg-[#F1F5F9] hover:bg-[#FCEBF3]">
				{#each row.tds as td}
					<td class="pl-3 {td.secondaryDescription ? 'font-medium' : 'font-normal'} text-[#7A8CA0]">
						<span class="group-hover:text-[#C54E7C]">{td.description}</span>
						{#if td.secondaryDescription}
							<br />
							<span class="font-normal text-[#7A8CA0]">{td.secondaryDescription}</span>
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<div class="my-4 flex justify-center gap-2 border-t border-[#E0E0E0]">
	{#if currentPage > 1}
		<button
			class="flex items-center gap-2 rounded-md px-4 py-2 text-[#7A8CA0] hover:bg-gray-300 disabled:opacity-50"
			on:click={() => onPageChange(currentPage - 1)}
		>
			<ArrowButton />Anterior
		</button>
	{/if}

	<button
		on:click={() => onPageChange(1)}
		class="
		{currentPage === 1 ? 'border-t-2 border-t-[#A03582] text-[#A03582]' : ''}
		 px-3 py-2 text-sm font-medium text-[#7A8CA0] transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-[#A03582]"
	>
		1
	</button>

	{#if currentPage > 6}
		<span class="mb-2 flex items-end text-[#7A8CA0]">...</span>
	{/if}

	{#each numberPages.slice(initialSlice, finalSlice) as page}
		<button
			class="
			{currentPage === page ? 'border-t-2 border-t-[#A03582] text-[#A03582]' : ''}
			 px-3 py-2 text-sm font-medium text-[#7A8CA0] transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-[#A03582]
			"
			on:click={() => onPageChange(page)}
		>
			{page}
		</button>
	{/each}

	{#if totalPages > 10 && currentPage < totalPages - 4}
		<span class="mb-2 flex items-end text-[#7A8CA0]">...</span>
		<button
			on:click={() => onPageChange(totalPages)}
			class="
			{currentPage === totalPages ? 'border-t-2 border-t-[#A03582] text-[#A03582]' : ''}
			 px-3 py-2 text-sm font-medium text-[#7A8CA0] transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-[#A03582]"
		>
			{totalPages}
		</button>
	{/if}

	{#if currentPage < totalPages}
		<button
			class="flex items-center gap-2 rounded-md px-4 py-2 text-[#7A8CA0] hover:bg-gray-300 disabled:opacity-50"
			on:click={() => onPageChange(currentPage + 1)}
		>
			Proximo
			<ArrowButton className="rotate-180" />
		</button>
	{/if}
</div>
