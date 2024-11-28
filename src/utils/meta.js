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
  const defaultImage = '/social-preview.png';
  const baseUrl = 'https://aliahad.com';

  // Ensure image URL is absolute
  const imageUrl = image ? 
    (image.startsWith('http') ? image : `${baseUrl}${image}`) : 
    `${baseUrl}${defaultImage}`;

  const tags = [
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
      content: imageUrl,
    },
    {
      property: 'og:type',
      content: type,
    },
    {
      property: 'og:image:width',
      content: '1200',
    },
    {
      property: 'og:image:height',
      content: '630',
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
      content: imageUrl,
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
    }
  ];

  // Add article-specific meta tags
  if (type === 'article') {
    tags.push(
      {
        property: 'article:author',
        content: `${baseUrl}`,
      },
      {
        property: 'article:publisher',
        content: `${baseUrl}`,
      }
    );
  }

  return {
    title: `${title} | ${siteName}`,
    meta: tags,
    link: [
      {
        rel: 'canonical',
        href: `https://aliahad.com${window?.location?.pathname || ''}`,
      },
    ],
  };
};
