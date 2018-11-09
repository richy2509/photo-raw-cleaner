module.exports = { contents: "function logDeepest(message, args = \"\") {\n    if (__debugLevel >= __DEBUG_LEVEL_DEEPEST) {\n        console.log(message, args);\n    }\n}\nfunction logMinimum(message, args = \"\") {\n    if (__debugLevel >= __DEBUG_LEVEL_MIN) {\n        console.log(message, args);\n    }\n}\nmodule.exports = {\n    logDeepest, logMinimum\n};\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1541764102074,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
