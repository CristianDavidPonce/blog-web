'use client'

import React from 'react'
import { OutputData } from '@editorjs/editorjs'

// use require since editorjs-html doesn't have types
const editorJsHtml = require('editorjs-html')
const EditorJsToHtml = editorJsHtml()

type Props = {
  data: OutputData
}
// eslint-disable-next-line no-undef
type ParsedContent = string | JSX.Element

const EditorJsRenderer = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[]
  return (
    // ✔️ It's important to add key={data.time} here to re-render based on the latest data.
    <div className='prose max-w-full' key={data.time}>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          )
        }
        return item
      })}
    </div>
  )
}

export default EditorJsRenderer
