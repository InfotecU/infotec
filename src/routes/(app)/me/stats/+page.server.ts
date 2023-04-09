import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
	// validate session
	await parent();

	const dbService = locals.dbService;

	const statsServices = dbService.getEntityService('userCompleteSection');
	const scoresSectionServices = dbService.getEntityService('sectionGiveScore');
	const scoresServices = dbService.getEntityService('scores');

	const { data: sectionsCompleteData, error: sectionsCompleteError } = await statsServices.getAll();
	const { data: scoresData, error: scoresError } = await scoresServices.getAll();

	if (sectionsCompleteError || sectionsCompleteData === null || scoresError || scoresData === null)
		throw error(500, { message: 'Ocurrio un error cargando las estadisticas del usuario' });

	const { data: scoresSectionData, error: scoresSectionError } =
		await scoresSectionServices.getFilterByColumn({
			column: 'section_id',
			value: sectionsCompleteData.map((complete) => complete.section_id),
			filterType: 'in'
		});

	return {
		scores: scoresData,
		scoresSection: scoresSectionData
	};
};
