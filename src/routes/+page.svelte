<script lang="ts">
	import people from './people.js';
	import Table from '$lib/components/table/component.svelte';
	import CircleIcon from '$lib/components/icons/circle-icon.svelte';
</script>

<div>
	<Table
		titles={[
			{ title: 'Nome' },
			{ title: 'Telefone' },
			{ title: 'Cargo' },
			{ title: 'Departamento' },
			{
				title: 'Ultimo Acesso',
				icon: CircleIcon
			}
		]}
		rows={people.map((item) => ({
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
