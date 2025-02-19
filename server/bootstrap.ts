import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
	const plugin = strapi.plugin("media-prefix").service("mediaService");

	strapi.db?.lifecycles.subscribe({
		beforeFindOne(event: any) {
			// Handle the event before finding one
		},
		afterFindOne(event: any) {
			if (event.result) {
				event.result = plugin.addMediaPrefix(event.result);
			}
		},
		beforeFindMany(event: any) {
			// Handle the event before finding many
		},
		afterFindMany(event: any) {
			if (event.result) {
				event.result = plugin.addMediaPrefix(event.result);
			}
		},
	});
};
