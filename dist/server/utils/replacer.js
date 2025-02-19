"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUploadsWithMediaPrefix = exports.initialize = void 0;
let MEDIA_PREFIX = "http://localhost:1337";
let MEDIA_PREFIX_PATH = "/uploads/";
let strapiInstance;
const initialize = (strapi) => {
    strapiInstance = strapi;
    if (process.env.MEDIA_PREFIX_PATH) {
        MEDIA_PREFIX_PATH = process.env.MEDIA_PREFIX_PATH;
    }
    if (process.env.MEDIA_PREFIX) {
        MEDIA_PREFIX = process.env.MEDIA_PREFIX;
    }
    else {
        MEDIA_PREFIX = strapiInstance.config.get("server.url", "http://localhost:1337");
    }
    MEDIA_PREFIX += MEDIA_PREFIX_PATH;
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
                obj[key].startsWith(MEDIA_PREFIX_PATH) &&
                key === "url") {
                obj[key] = obj[key].replace(MEDIA_PREFIX_PATH, MEDIA_PREFIX);
            }
            else {
                obj[key] = (0, exports.replaceUploadsWithMediaPrefix)(obj[key]);
            }
        }
    }
    return obj;
};
exports.replaceUploadsWithMediaPrefix = replaceUploadsWithMediaPrefix;
