'use client'

import * as React from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'

export function Editor({
  content,
  onChange,
}: {
  content?: OutputData
  onChange(val: OutputData): void
}) {
  const ref = React.useRef<EditorJS>()

  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed' as any)).default
    const Table = (await import('@editorjs/table' as any)).default
    const List = (await import('@editorjs/list' as any)).default
    const Code = (await import('@editorjs/code' as any)).default
    const LinkTool = (await import('@editorjs/link' as any)).default
    const InlineCode = (await import('@editorjs/inline-code' as any)).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Empieza a escribir aquí...',
        inlineToolbar: true,
        data: content,
        async onChange(api) {
          const data = await api.saver.save()
          onChange(data)
        },
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  return <div id='editor' className='min-h-[500px]' />
}
