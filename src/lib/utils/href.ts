/**
 * Whether a link leaves the site.
 *
 * Editable link fields hold either a site-relative path (`/competition`) or a
 * full URL someone pasted from a registration form, and the two want different
 * markup: an internal path belongs in `next/link` and opens in place, while an
 * external URL opens in a new tab with `rel="noopener noreferrer"`.
 *
 * Anything carrying a scheme or a protocol-relative `//` is external — that
 * covers `mailto:` and `tel:` as well as `https:`. A bare `example.com` is
 * treated as internal, because as an `href` that is exactly what the browser
 * would do with it.
 */
export function isExternalHref(href: string): boolean {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href.trim());
}
