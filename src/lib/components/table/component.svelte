<script lang="ts">
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
</script>

<div class="w-full overflow-x-auto">
	<table class="min-w-[1000px] border-separate border-spacing-y-4">
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
				<tr class="h-16 max-h-16 odd:bg-[#FFFFFF] even:bg-[#F1F5F9]">
					{#each row.tds as td}
						<td
							class="pl-3 {td.secondaryDescription ? 'font-medium' : 'font-normal'} text-[#7A8CA0]"
						>
							{td.description}
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
</div>
