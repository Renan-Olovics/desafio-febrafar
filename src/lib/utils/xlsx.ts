import { utils, writeFile } from 'xlsx';

export const exportToExcel = <T extends object[]>(data: T, fileName = 'dados.xlsx') => {
	const ws = utils.json_to_sheet(data);

	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, 'Planilha1');

	writeFile(wb, fileName);
};
