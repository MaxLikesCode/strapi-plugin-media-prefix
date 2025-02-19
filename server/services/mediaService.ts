import { Strapi } from "@strapi/strapi";
import { replaceUploadsWithMediaPrefix, initialize } from "../utils/replacer";

export default ({ strapi }: { strapi: Strapi }) => {
	// Initialize the replacer with strapi instance
	initialize(strapi);

	return {
		addMediaPrefix(obj: any) {
			return replaceUploadsWithMediaPrefix(obj);
		},
	};
};
