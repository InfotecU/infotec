import type { PageServerLoad } from './$types';
import MarkdownIt from 'markdown-it';

interface PageData {
	html: string;
}

export const load: PageServerLoad<PageData> = async () => {
	const source = '# This is a header \n * list \n* list \n ```javascript\n const x = 10\n ```';

	const md = new MarkdownIt();

	return {
		html: md.render(source)
	};
};
