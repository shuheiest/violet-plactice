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
  const [childFolderId, setChildFolderId] = useState(0)
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
      registerParentFolder(childfoldername)
      mutate()
    },
    [childfoldername]
  )
  const createChildFolderUnder = useCallback(
    async (id: number) => {
      if (!childfoldername) return
      const res = await api.childfolder
        .post({ body: { foldername: childfoldername, folderid: id } })
        .catch(onErr)
      if (!res) return
      registerParentFolder(childfoldername)
      mutate()
    },
    [childfoldername]
  )

  const registerParentFolder = useCallback(
    async (foldername: string) => {
      if (!childfoldername) return
      const res = await api.parentfolder
        .post({ body: { foldername: foldername, rootflg: false } })
        .catch(onErr)
      if (!res) return
      setChildFolderId(res.body.id)
      serChildfoldername('')
      mutate()
    },
    [foldername]
  )

  if (!childfolder) return <Fetching error={error} />

  return (
    <div>
      <ChildtreeArea>
        {childfolder.map((childparentfolder) => (
          <React.Fragment key={childparentfolder.id}>
            {childparentfolder.folderid === parentFolder.id && (
              <div>
                <div>∟{childparentfolder.foldername}</div>
                {childfolder.find((e) => e.folderid === childFolderId) ? (
                  <ChildFileTreeArea id={childFolderId} />
                ) : null}
                <form
                  style={{ textAlign: 'center' }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    createChildFolderUnder(childFolderId)
                  }}
                >
                  <input value={childfoldername} type="text" onChange={inputChildFoldername} />
                  <input type="submit" value="孫フォルダを追加" />
                </form>
              </div>
            )}
          </React.Fragment>
        ))}
      </ChildtreeArea>
      <form style={{ textAlign: 'center' }} onSubmit={createChildFolder}>
        <input value={childfoldername} type="text" onChange={inputChildFoldername} />
        <input type="submit" value="フォルダを追加" />
      </form>
    </div>
  )
}
