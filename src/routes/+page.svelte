<script lang="ts">
	import people from './people.js';

	import CircleIcon from '$lib/components/icons/circle-icon.svelte';
	import ArrowDown from '$lib/components/icons/arrow-down.svelte';
	import Button from '$lib/components/button/component.svelte';
	import Table from '$lib/components/table/component.svelte';
	import Input from '$lib/components/input/component.svelte';

	import { filterPeople } from '$lib/utils/filter.js';
	import { exportToExcel } from '$lib/utils/xlsx.js';

	const INITIAL_PAGE = 1;
	const INITIAL_PER_PAGE = 5;

	let currentPage = INITIAL_PAGE;
	let currentPerPage = INITIAL_PER_PAGE;
	let filterText = '';
	$: totalPages = Math.ceil(totalAmountFiltered / currentPerPage);
	$: totalAmountFiltered = filterPeople(people, filterText).length;

	$: (currentPage = 1), filterText;

	const titles = [
		{ title: 'Nome' },
		{ title: 'Telefone' },
		{ title: 'Cargo' },
		{ title: 'Departamento' },
		{ title: 'Ultimo Acesso', icon: CircleIcon }
	];

	$: rows = filterPeople(people, filterText)
		.slice((currentPage - 1) * currentPerPage, currentPage * currentPerPage)
		.map((item) => ({
			tds: [
				{ description: item.name, secondaryDescription: item.email },
				{ description: item.phone },
				{ description: item.cargos.join(', ') },
				{ description: item.departamentos.join(', ') },
				{
					description: item.ultimoAcesso
						? new Intl.DateTimeFormat('pt-BR', {
								day: '2-digit',
								month: 'short'
							}).format(new Date(item.ultimoAcesso))
						: '-',
					secondaryDescription: item.ultimoAcesso
						? new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(
								new Date(item.ultimoAcesso)
							)
						: ''
				}
			]
		}));

	const onExport = () => {
		exportToExcel(
			filterPeople(people, filterText).map(
				({ name, email, phone, cargos, departamentos, ultimoAcesso }) => ({
					Nome: name,
					Email: email,
					Telefone: phone,
					Cargos: cargos.join(', '),
					Departamentos: departamentos.join(', '),
					'Ultimo Acesso': ultimoAcesso
						? new Intl.DateTimeFormat('pt-BR', {
								day: '2-digit',
								month: 'short',
								year: 'numeric'
							}).format(new Date(ultimoAcesso))
						: '-'
				})
			)
		);
	};
</script>

<div class="container mx-auto mt-9 h-screen min-w-[500px] p-4">
	<div class=" items-center justify-between sm:flex">
		<h1 class="text-primary text-2xl font-bold">Contatos</h1>
		<div class="mt-5 flex gap-4 sm:mt-0 sm:flex-row">
			<Button on:click={onExport}>
				<ArrowDown />
				Exportar
			</Button>
			<Input bind:value={filterText} type="text" placeholder="Pesquisar" />
		</div>
	</div>
	<h5 class="text-secondary my-6">
		Exibindo {currentPerPage} do total de {totalAmountFiltered} registros encontrados
	</h5>
	<div class="flex w-full flex-col justify-center overflow-x-auto">
		<Table
			onPageChange={(page) => (currentPage = page)}
			onClearFilters={() => (filterText = '')}
			{currentPage}
			{totalPages}
			{titles}
			{rows}
		/>
	</div>
</div>
