
import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://unistudy.co';
const PUBLIC_DIR = path.resolve('public');

const STATIC_ROUTES = [
    '/',
    '/planes',
    '/blog',
    '/faq',
    '/soporte',
    '/legal/terminos',
    '/legal/privacidad',
    '/legal/reembolsos'
];

// Mock Plans ID for sitemap (since we can't easily import TS)
const PLANS = ['basic-canvas', 'pro-suite', 'team-pack'];

const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static Routes
    STATIC_ROUTES.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}${route}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>${route === ' / ' ? '1.0' : '0.8'}</priority>\n';
        xml += '  </url>\n';
    });

    // Plan Routes (Dynamic)
    PLANS.forEach(planId => {
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}/checkout/${planId}</loc>\n`; // Or product page if exists
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.9</priority>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
    console.log('✅ sitemap.xml generated in public/');

    // Robots.txt
    const robots = `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
    console.log('✅ robots.txt generated in public/');
};

generateSitemap();
