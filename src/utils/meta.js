export const defaultMetadata = {
  title: 'Ali Ahad | Personal Website',
  description: 'Software Engineer specializing in AI and Full Stack Development',
  image: 'https://pub-e7edf330000b452083606850ff459219.r2.dev/aa.jpg',
  type: 'website',
  twitterCard: 'summary_large_image',
  twitterCreator: '@aliahadmd1',
  url: 'https://aliahad.com'
}

export const generateMetaTags = ({ title, description, image, type = 'website' }) => {
  const siteName = 'Ali Ahad';
  const twitterHandle = '@aliahad'; // Replace with your actual Twitter handle
  const defaultDescription = 'Software Engineer specializing in AI and Full Stack Development';
  const defaultImage = '/social-preview.png'; // Default social preview image

  return {
    title: `${title} | ${siteName}`,
    meta: [
      {
        name: 'description',
        content: description || defaultDescription,
      },
      // Open Graph
      {
        property: 'og:site_name',
        content: siteName,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description || defaultDescription,
      },
      {
        property: 'og:image',
        content: image || defaultImage,
      },
      {
        property: 'og:type',
        content: type,
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: twitterHandle,
      },
      {
        name: 'twitter:creator',
        content: twitterHandle,
      },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description || defaultDescription,
      },
      {
        name: 'twitter:image',
        content: image || defaultImage,
      },
      // Additional SEO tags
      {
        name: 'author',
        content: siteName,
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'googlebot',
        content: 'index, follow',
      },
      // PWA related
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://aliahad.com${window?.location?.pathname || ''}`,
      },
    ],
  };
};
