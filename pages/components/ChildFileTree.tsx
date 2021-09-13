import useAspidaSWR from '@aspida/swr'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Fetching } from '~/components/organisms/Fetching'
import { useApi } from '~/hooks'

type useChildProps = {
  id: number
}

const ChildtreeArea = styled.div`
  padding-left: 5%;
`

export const ChildFileTreeArea: React.FC<useChildProps> = (parentFolder) => {
  const { api, onErr } = useApi()
  const [childfoldername, serChildfoldername] = useState('')
  const [foldername, setFoldername] = useState('')
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
      console.log('check')
      registerParentFolder()
      mutate()
    },
    [childfoldername]
  )
  const registerParentFolder = useCallback(async () => {
    if (!childfoldername) return
    const res = await api.parentfolder
      .post({ body: { foldername: childfoldername, rootflg: false } })
      .catch(onErr)
    if (!res) return
    console.log(res)
    serChildfoldername('')
    mutate()
  }, [foldername])
  if (!childfolder) return <Fetching error={error} />
  return (
    <ChildtreeArea>
      {childfolder.map((childparentfolder) => (
        <React.Fragment key={childparentfolder.id}>
          {childparentfolder.folderid === parentFolder.id && (
            <div>∟{childparentfolder.foldername}</div>
          )}
        </React.Fragment>
      ))}
      <form style={{ textAlign: 'center' }} onSubmit={createChildFolder}>
        <input value={childfoldername} type="text" onChange={inputChildFoldername} />
        <input type="submit" value="フォルダを追加" />
      </form>
    </ChildtreeArea>
  )
}
