"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const replacer_1 = require("../utils/replacer");
exports.default = ({ strapi }) => {
    // Initialize the replacer with strapi instance
    (0, replacer_1.initialize)(strapi);
    return {
        addMediaPrefix(obj) {
            return (0, replacer_1.replaceUploadsWithMediaPrefix)(obj);
        },
    };
};
