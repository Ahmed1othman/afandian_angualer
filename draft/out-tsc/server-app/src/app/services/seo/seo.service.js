"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const common_2 = require("@angular/common");
let SeoService = exports.SeoService = class SeoService {
    constructor(homeService, meta, titleService, rendererFactory, document, platformId, platformLocation) {
        this.homeService = homeService;
        this.meta = meta;
        this.titleService = titleService;
        this.rendererFactory = rendererFactory;
        this.document = document;
        this.platformId = platformId;
        this.platformLocation = platformLocation;
        this.currentLang = '';
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.setCurrentUrl();
    }
    setCurrentUrl() {
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            // For browser
            this.currentUrl = this.platformLocation.href || this.getUrlFromLocation();
        }
        else if ((0, common_2.isPlatformServer)(this.platformId)) {
            // For server
            this.currentUrl = this.getUrlFromLocation();
        }
    }
    getUrlFromLocation() {
        const location = this.platformLocation;
        return `${location.protocol}//${location.hostname}${location.pathname}${location.search}`;
    }
    updateMetadataForType(type) {
        this.homeService.getSeo().subscribe({
            next: (response) => {
                const matchedData = response[type]?.seo_data;
                if (matchedData) {
                    this.setMetaTags(matchedData, type);
                }
            },
            error: (error) => {
                console.error('Error fetching SEO data', error);
            },
        });
    }
    setMetaTags(matchedData, type) {
        // Clear existing meta tags
        this.clearMetaTags();
        // Set basic meta tags
        this.meta.updateTag({ name: 'title', content: matchedData.title });
        this.meta.updateTag({ name: 'description', content: matchedData.description });
        // Set Open Graph tags
        this.meta.updateTag({ property: 'og:title', content: matchedData.title });
        this.meta.updateTag({ property: 'og:description', content: matchedData.description });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: this.currentUrl });
        // Set Twitter Card tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: matchedData.title });
        this.meta.updateTag({ name: 'twitter:description', content: matchedData.description });
        // Set language alternates
        this.setLanguageAlternates();
        // Set canonical URL
        this.setCanonicalUrl();
        // Add structured data
        this.addStructuredData(type, matchedData);
    }
    og_property(matchedData) {
        this.meta.updateTag({ property: 'og:title', content: matchedData.seo_title });
        this.meta.updateTag({ property: 'og:description', content: matchedData.seo_description });
        this.meta.updateTag({ property: 'og:image', content: matchedData.seo_image });
        this.meta.updateTag({ property: 'og:image:alt', content: matchedData.seo_image_alt });
        this.meta.updateTag({ property: 'og:url', content: this.currentUrl });
        this.meta.updateTag({ property: 'og:site_name', content: 'متجر أفندينا' });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
    }
    og_property_product(matchedData) {
        this.meta.updateTag({ property: 'og:title', content: matchedData.name });
        this.meta.updateTag({ property: 'og:description', content: matchedData.description });
        this.meta.updateTag({ property: 'og:image', content: matchedData.images[0].file_path });
        this.meta.updateTag({ property: 'og:image', content: `https://admin.afandinacarrental.com/storage/${matchedData.images[0].file_path}` });
        this.meta.updateTag({ property: 'og:image:alt', content: matchedData.images[0].alt });
        this.meta.updateTag({ property: 'og:url', content: this.currentUrl });
        this.meta.updateTag({ property: 'og:site_name', content: 'متجر أفندينا' });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
    }
    addSchemas(schemas) {
        const existingScripts = Array.from(this.document.querySelectorAll('script[type="application/ld+json"]'));
        existingScripts.forEach(script => script.remove());
        for (const schemaKey in schemas) {
            if (schemas[schemaKey]) {
                const scriptContent = JSON.stringify(schemas[schemaKey]);
                if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                    const script = this.renderer.createElement('script');
                    script.type = 'application/ld+json';
                    script.text = scriptContent;
                    this.renderer.appendChild(this.document.head, script);
                }
                else if ((0, common_2.isPlatformServer)(this.platformId)) {
                    const scriptTag = `<script type="application/ld+json">${scriptContent}</script>`;
                    this.document.head.insertAdjacentHTML('beforeend', scriptTag);
                }
            }
        }
    }
    addCanonicalTag(url) {
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const existingLink = this.document.querySelector('link[rel="canonical"]');
            if (existingLink) {
                this.renderer.setAttribute(existingLink, 'href', url);
            }
            else {
                const link = this.renderer.createElement('link');
                this.renderer.setAttribute(link, 'rel', 'canonical');
                this.renderer.setAttribute(link, 'href', url);
                this.renderer.appendChild(this.document.head, link);
            }
        }
        else if ((0, common_2.isPlatformServer)(this.platformId)) {
            const canonicalTag = `<link rel="canonical" href="${url}">`;
            this.document.head.insertAdjacentHTML('beforeend', canonicalTag);
        }
    }
    addMetaRobotsTag(robotsData) {
        const content = `${robotsData.index}, ${robotsData.follow}`;
        const robotsMetaHTML = `<meta name="robots" content="${content}">`;
        if ((0, common_1.isPlatformBrowser)(this.platformId)) {
            const robotsMeta = this.document.querySelector('meta[name="robots"]');
            if (robotsMeta) {
                this.renderer.setAttribute(robotsMeta, 'content', content);
            }
            else {
                const meta = this.renderer.createElement('meta');
                this.renderer.setAttribute(meta, 'name', 'robots');
                this.renderer.setAttribute(meta, 'content', content);
                this.renderer.appendChild(this.document.head, meta);
            }
        }
        else if ((0, common_2.isPlatformServer)(this.platformId)) {
            this.document.head.insertAdjacentHTML('beforeend', robotsMetaHTML);
        }
    }
    clearMetaTags() {
        const tags = [
            'og:title',
            'og:description',
            'og:image',
            'og:url',
            'og:type',
        ];
        tags.forEach((tag) => {
            this.meta.removeTag(`property="${tag}"`);
        });
    }
    setLanguageAlternates() {
        // TO DO: implement language alternates
    }
    setCanonicalUrl() {
        // TO DO: implement canonical URL
    }
    addStructuredData(type, matchedData) {
        // TO DO: implement structured data
    }
};
exports.SeoService = SeoService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    }),
    tslib_1.__param(4, (0, core_1.Inject)(common_1.DOCUMENT)),
    tslib_1.__param(5, (0, core_1.Inject)(core_1.PLATFORM_ID))
], SeoService);
//# sourceMappingURL=seo.service.js.map