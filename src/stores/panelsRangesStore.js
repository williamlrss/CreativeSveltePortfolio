import { writable } from 'svelte/store';

export const sectionsStore = writable({});

export const panelsRanges = (id, height, yPosition) => {
	sectionsStore.update(currentSections => {
		return {
			...currentSections,
			[id]: { height, yPosition },
		};
	});
};
