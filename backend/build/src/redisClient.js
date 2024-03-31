"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
exports.client = (0, redis_1.createClient)({
    url: 'redis://default:mypass@20.197.55.120:6379/',
})
    .on('error', e => console.log(e))
    .connect();
//# sourceMappingURL=redisClient.js.map