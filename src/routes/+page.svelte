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

<div class="container mx-auto h-screen p-4">
	<div class=" flex items-center justify-between">
		<h1 class="text-2xl font-bold text-[#A03582]">Contatos</h1>
		<div class="flex gap-4">
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
				class="flex items-center gap-2 rounded-lg border border-[#E0E0E0] bg-white px-4 py-2 text-[#A03582] shadow-md transition hover:bg-[#F5F5F5]"
			>
				<ArrowDown />
				Exportar
			</button>
			<div class="relative">
				<input
					bind:value={filterText}
					type="text"
					placeholder="Pesquisar"
					class="w-48 rounded-lg border border-[#E0E0E0] bg-white px-4 py-2 pr-10 text-[#7A8CA0] shadow-md transition focus:border-[#A03582] focus:ring-[#A03582]"
				/>
				<Search />
			</div>
		</div>
	</div>
	<h5 class="my-6 text-[#7A8CA0]">
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
