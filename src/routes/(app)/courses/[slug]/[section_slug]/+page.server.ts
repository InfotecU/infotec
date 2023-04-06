import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import MarkdownIt from 'markdown-it';

export const load: PageServerLoad = async ({ locals, params }) => {
	const dbService = locals.dbService;

	const sectionServices = dbService.getEntityService('sections');
	const articleServices = dbService.getEntityService('articles');

	const md = new MarkdownIt();

	const { data: sectionData, error: sectionError } = await sectionServices.getOneByColumn({
		column: 'slug',
		value: params.section_slug
	});

	if (sectionError || sectionData == null)
		throw error(500, { message: 'Ocurrio un error cargando el contenido del curso' });

	const { data: articlesData, error: articleError } = await articleServices.getOneByColumn({
		column: 'section_id',
		value: sectionData[0].id
	});

	if (articleError || articlesData == null)
		throw error(500, { message: 'Ocurrio un error cargando el contenido del curso' });

	const section = sectionData[0];
	section.articles = articlesData.map((article) => {
		article.content = md.render(article.content);
		return article;
	});

	return {
		section
	};
};
