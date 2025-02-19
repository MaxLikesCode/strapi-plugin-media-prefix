import type { Strapi } from "@strapi/types/dist/core/index";
import type { Event } from "@strapi/database/dist/lifecycles";

let MEDIA_PREFIX = "http://localhost:1337";
let MEDIA_PATH_PATTERN = "/uploads/";
let strapiInstance: Strapi;

export const initialize = (strapi: Strapi) => {
	strapiInstance = strapi;
	if (process.env.MEDIA_PATH_PATTERN) {
		MEDIA_PATH_PATTERN = process.env.MEDIA_PATH_PATTERN;
	}
	if (process.env.MEDIA_PREFIX) {
		MEDIA_PREFIX = process.env.MEDIA_PREFIX;
	} else {
		MEDIA_PREFIX = strapiInstance.config.get(
			"server.url",
			"http://localhost:1337"
		);
	}
	MEDIA_PREFIX += MEDIA_PATH_PATTERN;
};

export const replaceUploadsWithMediaPrefix = (obj: Event) => {
	if (Array.isArray(obj)) {
		for (let i = 0; i < obj.length; i++) {
			obj[i] = replaceUploadsWithMediaPrefix(obj[i]);
		}
	} else if (typeof obj === "object" && obj !== null) {
		for (let key in obj) {
			if (
				typeof obj[key] === "string" &&
				obj[key].startsWith(MEDIA_PATH_PATTERN) &&
				key === "url"
			) {
				obj[key] = obj[key].replace(MEDIA_PATH_PATTERN, MEDIA_PREFIX);
			} else {
				obj[key] = replaceUploadsWithMediaPrefix(obj[key]);
			}
		}
	}
	return obj;
};
