import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'



import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const authorDetails = await getFileBySlug('authors', ['default'])

  return { props: { posts, authorDetails } }
}

export default function Home({ posts, authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />

    
    </>
  )
}
