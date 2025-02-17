<script lang="ts">
	import people from './people.js';
	import Table from '$lib/components/table/component.svelte';
	import CircleIcon from '$lib/components/icons/circle-icon.svelte';
	import ArrowDown from '$lib/components/icons/arrow-down.svelte';
	import Search from '$lib/components/icons/search.svelte';
	import { exportToExcel } from '$lib/utils/xlsx.js';

	let currentPage = 1;
	let currentPerPage = 5;
	let filterText = '';
	$: pages = Math.ceil(totalAmountFiltered / currentPerPage);
	$: totalAmountFiltered = people.filter(
		({ name, email, phone }) =>
			email.toLowerCase().includes(filterText.toLowerCase()) ||
			name.toLowerCase().includes(filterText.toLowerCase()) ||
			phone.toLowerCase().includes(filterText.toLowerCase())
	).length;

	$: (currentPage = 1), filterText;
</script>

<div class="container mx-auto mt-9 h-screen min-w-[500px] p-4">
	<div class=" items-center justify-between sm:flex">
		<h1 class="text-primary text-2xl font-bold">Contatos</h1>
		<div class="mt-5 flex gap-4 sm:mt-0 sm:flex-row">
			<button
				on:click={() =>
					exportToExcel(
						people
							.filter(
								({ email, name, phone }) =>
									email.toLowerCase().includes(filterText.toLowerCase()) ||
									name.toLowerCase().includes(filterText.toLowerCase()) ||
									phone.toLowerCase().includes(filterText.toLowerCase())
							)
							.map(({ name, email, phone, cargos, departamentos, ultimoAcesso }) => ({
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
							}))
					)}
				class="border-white2 text-textborder-primary hover:bg-white3 flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-md transition"
			>
				<ArrowDown />
				Exportar
			</button>
			<div class="relative">
				<input
					bind:value={filterText}
					type="text"
					placeholder="Pesquisar"
					class="border-white2 text-secondary focus:border-primary focus:ring-textborder-primary w-48 rounded-lg border bg-white px-4 py-2 pr-10 shadow-md transition"
				/>
				<Search />
			</div>
		</div>
	</div>
	<h5 class="text-secondary my-6">
		Exibindo {currentPerPage} do total de {totalAmountFiltered} registros encontrados
	</h5>
	<div class="flex w-full flex-col justify-center overflow-x-auto">
		<Table
			onClearFilters={() => (filterText = '')}
			onPageChange={(page) => (currentPage = page)}
			{currentPage}
			totalPages={pages}
			titles={[
				{ title: 'Nome' },
				{ title: 'Telefone' },
				{ title: 'Cargo' },
				{ title: 'Departamento' },
				{ title: 'Ultimo Acesso', icon: CircleIcon }
			]}
			rows={people
				.filter(
					({ email, name, phone }) =>
						email.toLowerCase().includes(filterText.toLowerCase()) ||
						name.toLowerCase().includes(filterText.toLowerCase()) ||
						phone.toLowerCase().includes(filterText.toLowerCase())
				)
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
				}))}
		/>
	</div>
</div>
