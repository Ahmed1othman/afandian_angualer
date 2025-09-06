/**
 * Selective Polyfills based on browser support
 */

// Import only needed zone.js features
import 'zone.js/dist/zone';  // Required for Angular
import 'zone.js/dist/zone-error';  // Error handling

// Conditional polyfills based on browser support
if (!Object.fromEntries) {
    require('core-js/features/object/from-entries');
}

if (!String.prototype.replaceAll) {
    require('core-js/features/string/replace-all');
}

if (!Array.prototype.flat) {
    require('core-js/features/array/flat');
}

// Import Intl only if needed
if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/ar');
    require('@formatjs/intl-pluralrules/locale-data/en');
}

if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/ar');
    require('@formatjs/intl-relativetimeformat/locale-data/en');
}
