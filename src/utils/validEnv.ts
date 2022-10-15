module.exports = (): boolean => {
    return (!!process.env.BOT_TOKEN || !!process.env.DATABASE_URL);
}