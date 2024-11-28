import aboutMeMd from '../assets/personal/aboutme.md?raw'
import portfolioMd from '../assets/personal/portfolio.md?raw'

export const getMarkdownContent = (name) => {
  const markdownFiles = {
    aboutme: aboutMeMd,
    portfolio: portfolioMd
  }
  return markdownFiles[name] || ''
}
