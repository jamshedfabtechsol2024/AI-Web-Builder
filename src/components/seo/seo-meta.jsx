// components/seo/SeoMeta.jsx
export function SEOMeta({
  title = "Staron AI - Create Stunning Websites with AI",
  description = "Effortlessly build beautiful websites using AI technology. Perfect for developers and non-developers alike.",
  path = "/",
  author,
  keywords,
  imagePath = "",
}) {
  const siteUrl = "https://your-website.com"; // Set in one place
  const canonicalUrl = `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${imagePath}`;
  const twitterHandle = "@aiwebbuilder";
  const companyName = "Staron AI";

  return (
    <>
      <title>{title}</title>

      {/* Essential tags */}
      <meta content={description} name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link href={canonicalUrl} rel="canonical" />

      {/* Conditional tags */}
      {keywords && <meta content={keywords} name="keywords" />}
      {author && <meta content={author} name="author" />}

      {/* Open Graph */}
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={canonicalUrl} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content={imageUrl} property="og:image" />
      <meta content={companyName} property="og:site_name" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image" />
      <meta content={twitterHandle} name="twitter:site" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: title,
          description,
          url: siteUrl,
          publisher: {
            "@type": "Organization",
            name: companyName,
            logo: `${siteUrl}/logo.png`,
          },
        })}
      </script>
    </>
  );
}
