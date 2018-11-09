function endsWithAnyCase(p: string, v: string): boolean {
    return p && v && (p.endsWith(v) || p.endsWith(v.toUpperCase()));
}

module.exports = {
    endsWithAnyCase
};