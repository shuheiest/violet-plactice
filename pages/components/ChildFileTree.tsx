import useAspidaSWR from '@aspida/swr'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useApi } from '~/hooks'

type useChildProps = {
  parentFolderid: number
}

export const ChildFileTreeArea: React.FC<useChildProps> = (parentFolderid) => {
  console.log(parentFolderid)
  const { api, onErr } = useApi()
  const [childfolderid, serChildfolderid] = useState(0)
  const [childfoldername, serChildfoldername] = useState('')
  const { data: folderid, error, mutate } = useAspidaSWR(api.childfolder)
  const inputChildFoldername = useCallback((e: ChangeEvent<HTMLInputElement>) => e.target.value, [])
  const createChildFolder = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!childfoldername) return

      const res = await api.childfolder
        .post({ body: { foldername: childfoldername, folderid: childfolderid } })
        .catch(onErr)
      if (!res) return
      serChildfolderid(0)
      mutate()
    },
    [childfoldername]
  )

  return <div></div>
}
