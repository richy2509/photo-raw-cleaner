export function logDeepest(message: string, args: any = ""): void {
    if (__debugLevel >= __DEBUG_LEVEL_DEEPEST) {
        console.log(message, args);
    }
}

export function logMinimum(message: string, args: any = ""): void  {
    if (__debugLevel >= __DEBUG_LEVEL_MIN) {
        console.log(message, args);
    }
}

export function logMinimumCallback(callback: () => any): void {
    if (__debugLevel >= __DEBUG_LEVEL_MIN) {
        callback();
    }
}