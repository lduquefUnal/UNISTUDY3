import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, getSeoGlobal, loadSeoGlobal, loadSeoPages } from '../../services/mockSeo';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    noindex?: boolean;
    type?: 'website' | 'article' | 'product';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    image,
    noindex = false,
    type = 'website'
}) => {
    const location = useLocation();
    const [globalConfig, setGlobalConfig] = useState(getSeoGlobal());
    const [pageConfig, setPageConfig] = useState(getSeoForPath(location.pathname));

    useEffect(() => {
        const loadSeo = async () => {
            const [global] = await Promise.all([
                loadSeoGlobal(),
                loadSeoPages()
            ]);
            setGlobalConfig(global);
            setPageConfig(getSeoForPath(location.pathname));
        };
        loadSeo();
    }, [location.pathname]);

    // Hierarchy: Prop > Page Config > Global Default
    const finalTitle = title || pageConfig?.title || globalConfig.defaultTitle;
    const finalDescription = description || pageConfig?.description || globalConfig.defaultDescription;
    const finalImage = image || pageConfig?.ogImage || globalConfig.ogImageUrl;
    const currentUrl = `${globalConfig.baseUrl}${location.pathname}`;
    const shouldIndex = noindex || pageConfig?.noindex;

    // Structured Data (Organization)
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": globalConfig.siteName,
        "url": globalConfig.baseUrl,
        "logo": globalConfig.ogImageUrl,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": `+${globalConfig.contact.whatsapp}`,
            "contactType": "customer service"
        }
    };

    return (
        <Helmet>
            {/* Basic Meta */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={currentUrl} />
            {shouldIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* OpenGraph */}
            <meta property="og:site_name" content={globalConfig.siteName} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={type} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Schemas */}
            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>
        </Helmet>
    );
};
