import useAspidaSWR from '@aspida/swr'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Fetching } from '~/components/organisms/Fetching'
import { useApi } from '~/hooks'
import { ChildFileTreeArea } from './ChildFileTree'

const FiletreeArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  margin-right: auto;
  background-color: #757377;
  border-color: rgb(150, 180, 190);
  border-width: 1px;

  a:hover {
    background-color: #e4e4e4;
  }
`

const AddFolder = styled.div`
  position: absolute;
  top: 90%;
  left: 15%;
  width: 160px;
  height: 20px;
  background-color: #e2e4cf;

  a {
    display: flex;
    justify-content: center;
    margin: auto;
    text-align: center;
  }
`

const Filetree = styled.ul`
  width: 150px;
  padding: 0;
  list-style-type: none;
  > li {
    border-bottom: 1px solid #eee;
  }
`

export const FileTreeArea = () => {
  const { api, onErr } = useApi()
  const [foldername, setFoldername] = useState('')
  const { data: parentfolder, error, mutate } = useAspidaSWR(api.parentfolder)
  const inputFoldername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFoldername(e.target.value),
    []
  )

  const createFolder = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!foldername) return
      const res = await api.parentfolder.post({ body: { foldername, rootflg: true } }).catch(onErr)
      if (!res) return

      setFoldername('')
      mutate()
    },
    [foldername]
  )

  const clickFolderName = (id: number) => {
    console.log('check')
    console.log(id)
  }

  if (!parentfolder) return <Fetching error={error} />

  return (
    <FiletreeArea>
      <Filetree>
        {parentfolder.map((parentfolder) => (
          <React.Fragment key={parentfolder.id}>
            {parentfolder.rootflg && (
              <div>
                <a onClick={() => clickFolderName(parentfolder.id)}>{parentfolder.foldername}</a>
                <ChildFileTreeArea id={parentfolder.id} />
              </div>
            )}
          </React.Fragment>
        ))}
      </Filetree>

      <AddFolder>
        <a>??????????????????????????????</a>
        <form style={{ textAlign: 'center' }} onSubmit={createFolder}>
          <input value={foldername} type="text" onChange={inputFoldername} />
          <input type="submit" value="ADD" />
        </form>
      </AddFolder>
    </FiletreeArea>
  )
}
