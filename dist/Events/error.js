"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'error',
    once: false,
    async execute(error, client) {
        throw error;
    }
};
