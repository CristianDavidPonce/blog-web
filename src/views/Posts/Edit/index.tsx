import React, { useState } from 'react'
import useVisible from '@/hooks/useVisible'
import { useCreateOne, useGetTable } from '@/rest/user'
import CreateTag from '@/views/Admin/Tags/Create'
import { ITag, urlTags } from '@/views/Admin/Tags/types'
import { OutputData } from '@editorjs/editorjs'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import { Button } from '@/components/ui/button'
import { Callout } from '@/components/utils/Callout'
import { Editor } from '@/components/utils/Editor'
import Header from '@/components/utils/Header'
import { postsOwnUrl } from '../types'

interface IProps {
  onClose: () => void
  id: number
}
const Edit = (props: IProps) => {
  const form = useForm()
  const [data, setData] = useState<OutputData>()
  const tags = useGetTable<ITag>({
    url: urlTags,
    params: { params: { limit: 100000, page: 1 } },
  })
  const createTag = useVisible()
  const mutation = useCreateOne({
    url: postsOwnUrl,
    onSuccess: () => {
      props.onClose()
    },
  })

  return (
    <>
      {createTag.visible && <CreateTag onClose={createTag.close} />}
      {!createTag.visible && (
        <>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit((x) => {
                mutation.mutate({ ...x, content: data?.blocks })
              })}
            >
              <Header
                title='Crear Post'
                actions={
                  <Button type='submit' disabled={mutation.isLoading}>
                    Crear
                  </Button>
                }
                onBack={props.onClose}
              />
              <div className='prose prose-stone mx-auto mb-4 max-w-[650px]'>
                <Input
                  label='Titulo'
                  name='title'
                  inputProps={{ placeholder: 'Titulo' }}
                />
                <Select
                  name='tags'
                  label='Tags'
                  selectProps={{
                    placeholder: 'Tags',
                    mode: 'multiple',
                    options: tags.data?.items.map((x) => ({
                      label: x.name,
                      value: x.id,
                    })),
                    notFoundContent: (
                      <div className='flex flex-col items-center justify-center gap-2 pt-2'>
                        No hay datos
                        <Button className='max-w-sm' onClick={createTag.open}>
                          Crear Tag
                        </Button>
                      </div>
                    ),
                  }}
                />
                {mutation.error && (
                  <Callout type='danger'>
                    {mutation.error.response?.data.message}
                  </Callout>
                )}
              </div>
              <Editor onChange={setData} />
            </form>
          </FormProvider>
        </>
      )}
    </>
  )
}

export default Edit
