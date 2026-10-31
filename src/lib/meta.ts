import { useEffect } from 'react'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title.includes('Industrial Pensions Trust') ? title : `${title} | Industrial Pensions Trust`
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) { tag = document.createElement('meta'); tag.name = 'description'; document.head.appendChild(tag) }
    tag.content = description
  }, [title, description])
}
