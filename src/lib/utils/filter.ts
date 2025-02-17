import type { People } from '$lib/types';

export const filterPeople = (people: People[], filter: string) =>
	people.filter(
		({ name, email, phone }) =>
			email.toLowerCase().includes(filter.toLowerCase()) ||
			name.toLowerCase().includes(filter.toLowerCase()) ||
			phone.toLowerCase().includes(filter.toLowerCase())
	);
