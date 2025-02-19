"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUploadsWithMediaPrefix = exports.initialize = void 0;
let MEDIA_PREFIX = "http://localhost:1337";
let MEDIA_URL_PATTERN = "/uploads/";
let MEDIA_URL_REPLACE_ACTION = "replace";
let strapiInstance;
const initialize = (strapi) => {
    strapiInstance = strapi;
    if (process.env.MEDIA_URL_PATTERN) {
        MEDIA_URL_PATTERN = process.env.MEDIA_URL_PATTERN;
    }
    if (process.env.MEDIA_PREFIX) {
        MEDIA_PREFIX = process.env.MEDIA_PREFIX;
    }
    else {
        MEDIA_PREFIX = strapiInstance.config.get("server.url", "http://localhost:1337");
    }
    if (process.env.MEDIA_URL_REPLACE_ACTION) {
        MEDIA_URL_REPLACE_ACTION = process.env
            .MEDIA_URL_REPLACE_ACTION;
    }
    if (MEDIA_URL_REPLACE_ACTION === "prepend") {
        MEDIA_PREFIX += MEDIA_URL_PATTERN;
    }
};
exports.initialize = initialize;
const replaceUploadsWithMediaPrefix = (obj) => {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = (0, exports.replaceUploadsWithMediaPrefix)(obj[i]);
        }
    }
    else if (typeof obj === "object" && obj !== null) {
        for (let key in obj) {
            if (typeof obj[key] === "string" &&
                obj[key].startsWith(MEDIA_URL_PATTERN) &&
                key === "url") {
                obj[key] = obj[key].replace(MEDIA_URL_PATTERN, MEDIA_PREFIX);
            }
            else {
                obj[key] = (0, exports.replaceUploadsWithMediaPrefix)(obj[key]);
            }
        }
    }
    return obj;
};
exports.replaceUploadsWithMediaPrefix = replaceUploadsWithMediaPrefix;
