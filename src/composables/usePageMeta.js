import { useHead } from '@vueuse/head'
import { watchEffect } from 'vue'
import { generateMetaTags } from '../utils/meta'

export function usePageMeta(pageData, options = {}) {
  watchEffect(() => {
    const { title, subtitle, image, type = 'website', structuredData } = pageData

    if (title?.value && subtitle?.value) {
      const headConfig = {
        title: `${title.value} - Ali Ahad`,
        meta: generateMetaTags({
          title: title.value,
          description: subtitle.value,
          image: image?.value,
          type
        })
      }

      if (structuredData?.value) {
        headConfig.script = [
          {
            type: 'application/ld+json',
            children: JSON.stringify(structuredData.value)
          }
        ]
      }

      useHead(headConfig)
    }
  })
}
