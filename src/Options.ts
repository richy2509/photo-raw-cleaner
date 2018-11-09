function extractParameter(args, param: ValueParameter) {
    const returnValue = args[param.position + 1]
    && args[param.position + 1].startsWith(`--${param.name}`)
    && args[param.position + 1].split("=").length === 2
    && args[param.position + 1].split("=")[1]
        ? args[param.position + 1].split("=")[1] : param.defaultValue;
    if (!returnValue && returnValue !== 0) { console.error(`Unable to find in position ${param.position}, the parameter : ${param.name}`
        + `\n instead, you have the parameter : ${args[param.position + 1]}`); process.exit(1); }
    return returnValue;
}

module.exports = {
    extractParameter
};