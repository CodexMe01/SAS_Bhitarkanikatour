import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, keywords }) => {
    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title} | Stay and Sail Boat Service Bhitarkanika</title>
            <meta name='description' content={description} />

            { /* End standard metadata tags */}

            { /* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content="Stay and Sail" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */}

            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */}

            {/* Keywords */}
            {keywords && <meta name="keywords" content={keywords} />}

            {canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
    );
};

export default SEO;
