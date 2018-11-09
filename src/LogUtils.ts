function logDeepest(message: string, args: any = ""): void {
    if (__debugLevel >= __DEBUG_LEVEL_DEEPEST) {
        console.log(message, args);
    }
}

function logMinimum(message: string, args: any = ""): void  {
    if (__debugLevel >= __DEBUG_LEVEL_MIN) {
        console.log(message, args);
    }
}

function logMinimumCallback(callback: () => any): void {
    if (__debugLevel >= __DEBUG_LEVEL_MIN) {
        callback();
    }
}

module.exports = {
    logDeepest, logMinimum, logMinimumCallback
};