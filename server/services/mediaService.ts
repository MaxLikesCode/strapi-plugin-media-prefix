import type { Strapi } from "@strapi/types/dist/core/index";
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
