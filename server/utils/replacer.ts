import type { Strapi } from "@strapi/types/dist/core/index";
import type { Event } from "@strapi/database/dist/lifecycles";

type ReplaceAction = "replace" | "prepend";

let MEDIA_PREFIX = "http://localhost:1337";
let MEDIA_URL_PATTERN = "/uploads/";
let MEDIA_PREFIX_REPLACE_ACTION: ReplaceAction = "replace";
let strapiInstance: Strapi;

export const initialize = (strapi: Strapi) => {
	strapiInstance = strapi;
	if (process.env.MEDIA_URL_PATTERN) {
		MEDIA_URL_PATTERN = process.env.MEDIA_URL_PATTERN;
	}
	if (process.env.MEDIA_PREFIX) {
		MEDIA_PREFIX = process.env.MEDIA_PREFIX;
	} else {
		MEDIA_PREFIX = strapiInstance.config.get(
			"server.url",
			"http://localhost:1337"
		);
	}
	if (process.env.MEDIA_PREFIX_REPLACE_ACTION) {
		MEDIA_PREFIX_REPLACE_ACTION = process.env
			.MEDIA_PREFIX_REPLACE_ACTION as ReplaceAction;
	}
	if (MEDIA_PREFIX_REPLACE_ACTION === "prepend") {
		MEDIA_PREFIX += MEDIA_URL_PATTERN;
	}
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
				obj[key].startsWith(MEDIA_URL_PATTERN) &&
				key === "url"
			) {
				obj[key] = obj[key].replace(MEDIA_URL_PATTERN, MEDIA_PREFIX);
			} else {
				obj[key] = replaceUploadsWithMediaPrefix(obj[key]);
			}
		}
	}
	return obj;
};
