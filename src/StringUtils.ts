/**
 *
 * @param p
 * @param v
 */
export function endsWithAnyCase(p: string, v: string): boolean {
    return p && v && (p.endsWith(v) || p.endsWith(v.toUpperCase()));
}