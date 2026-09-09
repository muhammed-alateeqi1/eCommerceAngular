/**
 * Runtime environment values.
 *
 * `SiteURL` is resolved from the browser at call time rather than hardcoded, so
 * the payment provider redirects back to whatever origin the app is served from
 * (localhost during development, the deployed domain in production).
 */
export const Environment = {
  baseUrl: 'https://ecommerce.routemisr.com/',

  get SiteURL(): string {
    return typeof window !== 'undefined' && window.location
      ? window.location.origin
      : 'http://localhost:4200';
  },
};
