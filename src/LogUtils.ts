function logDeepest(message: string, args: any = ""): void {
    if (__debugLevel >= __DEBUG_LEVEL_DEEPEST) {
        console.log(message, args);
    }
}

function logMinimum(message, args: any = ""): void  {
    if (__debugLevel >= __DEBUG_LEVEL_MIN) {
        console.log(message, args);
    }
}

module.exports = {
    logDeepest, logMinimum
};