import useAspidaSWR from '@aspida/swr'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Fetching } from '~/components/organisms/Fetching'
import { useApi } from '~/hooks'

type useChildProps = {
  id: number
}

export const ChildFileTreeArea: React.FC<useChildProps> = (parentFolder) => {
  const { api, onErr } = useApi()
  const [childfoldername, serChildfoldername] = useState('')
  const { data: childfolder, error, mutate } = useAspidaSWR(api.childfolder)
  const inputChildFoldername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => serChildfoldername(e.target.value),
    []
  )
  const createChildFolder = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!childfoldername) return
      const res = await api.childfolder
        .post({ body: { foldername: childfoldername, folderid: parentFolder.id } })
        .catch(onErr)
      if (!res) return
      serChildfoldername('')
      mutate()
    },
    [childfoldername]
  )
  if (!childfolder) return <Fetching error={error} />
  return (
    <div>
      {childfolder.map((childparentfolder) => (
        <React.Fragment key={childparentfolder.id}>
          {childparentfolder.folderid === parentFolder.id && (
            <li>
              <label>
                <span>∟{childparentfolder.foldername}</span>
              </label>
            </li>
          )}
        </React.Fragment>
      ))}
      <form style={{ textAlign: 'center' }} onSubmit={createChildFolder}>
        <input value={childfoldername} type="text" onChange={inputChildFoldername} />
        <input type="submit" value="フォルダを追加" />
      </form>
    </div>
  )
}
