"use strict";
module.exports = () => {
    return (!!process.env.BOT_TOKEN || !!process.env.DATABASE_URL);
};
