import React from 'react'
import styled from 'styled-components'

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
`

const AddFolder = styled.div`
  position: absolute;
  top: 90%;
  left: 15%;
  width: 130px;
  height: 20px;
  background-color: #e2e4cf;

  a {
    display: flex;
    justify-content: center;
    margin: auto;
    text-align: center;
  }
`

const AddFile = styled.div`
  position: absolute;
  top: 95%;
  left: 15%;
  width: 130px;
  height: 20px;
  background-color: #e2e4cf;

  a {
    display: flex;
    justify-content: center;
    margin: auto;
    text-align: center;
  }
`

export const FileTreeArea = () => {
  return (
    <FiletreeArea>
      <AddFolder>
        <a>フォルダを追加</a>
      </AddFolder>
      <AddFile>
        <a>ファイルを追加</a>
      </AddFile>
    </FiletreeArea>
  )
}
