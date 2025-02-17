<script lang="ts">
	const MIN_VALUE_TO_START_SLICING = 6;
	const MAX_VALUE_TO_SHOW = 10;

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
	export let onClearFilters: () => void;

	$: numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

	let initialSlice = 1;
	let finalSlice = MAX_VALUE_TO_SHOW;

	$: {
		if (currentPage > MIN_VALUE_TO_START_SLICING && currentPage < totalPages - 1) {
			initialSlice = currentPage - 5;
			finalSlice = currentPage + 4;
		}

		if (currentPage === totalPages) {
			initialSlice = totalPages - 9;
			finalSlice = totalPages;
		}
		if (currentPage < MIN_VALUE_TO_START_SLICING) {
			initialSlice = 1;
			finalSlice = MAX_VALUE_TO_SHOW;
		}
	}
</script>

<div class="min-w-[1000px] overflow-hidden rounded-xl border-2 shadow">
	<table class="w-full border-collapse rounded-xl">
		<thead class="bg-white1 rounded">
			<tr>
				{#each titles as data}
					<th
						class="border-white4 text-tertiary border-b p-3 text-left
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
		<tbody>
			{#each rows as row}
				<tr class="even:bg-white1 hover:bg-white3 group h-20 cursor-pointer odd:bg-white">
					{#each row.tds as td}
						<td
							class="pl-3 {td.secondaryDescription ? 'font-medium' : 'font-normal'} text-secondary"
						>
							<span class="group-hover:text-primary">{td.description}</span>
							{#if td.secondaryDescription}
								<br />
								<span class="text-secondary font-normal">{td.secondaryDescription}</span>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
			{#if rows.length === 0}
				<tr class="h-96">
					<td class="text-secondary text-center font-medium" colspan={titles.length}>
						Nenhum registro encontrado
						<br />
						<span class=" font-normal">
							Tente alterar a sua pesquisa ou filtro para encontrar o que deseja.
						</span>
						<br />
						<button on:click={onClearFilters} class="text-primary mt-5 font-medium">
							Limpar Filtros
						</button>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<div class="border-white2 my-4 flex justify-start gap-2 border-t md:justify-center">
	{#if currentPage > 1}
		<button
			class="text-secondary flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			on:click={() => onPageChange(currentPage - 1)}
		>
			<ArrowButton />Anterior
		</button>
	{/if}

	<button
		on:click={() => onPageChange(1)}
		class="
		{currentPage === 1 ? 'text-primary border-t-primary border-t-2' : ''}
		 text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-300"
	>
		1
	</button>

	{#if currentPage > 6}
		<span class="text-secondary mb-2 flex items-end">...</span>
	{/if}

	{#each numberPages.slice(initialSlice, finalSlice) as page}
		<button
			class="
			{currentPage === page ? 'border-t-primary text-primary border-t-2' : ''}
			 text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-300
			"
			on:click={() => onPageChange(page)}
		>
			{page}
		</button>
	{/each}

	{#if totalPages > 10 && currentPage < totalPages - 4}
		<span class="text-secondary mb-2 flex items-end">...</span>
		<button
			on:click={() => onPageChange(totalPages)}
			class="
			{currentPage === totalPages ? 'border-t-primary text-primary border-t-2' : ''}
			 text-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-300"
		>
			{totalPages}
		</button>
	{/if}

	{#if currentPage < totalPages}
		<button
			class="text-secondary flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			on:click={() => onPageChange(currentPage + 1)}
		>
			Proximo
			<ArrowButton className="rotate-180" />
		</button>
	{/if}
</div>
