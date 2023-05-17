'use client'

import { FC, useState } from 'react'
import { DataTable } from '@components/ui/DataTable'
import { columns } from '@components/ui/Columns'
import Delete from '@components/models/Delete'
import Header from '@components/Header'
import Drawer from '@components/ui/Drawer'

import {
  setModal,
  selectedModal,
  selectedModalId,
} from '@redux/slices/modalSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

interface AppProps {
  data: any
}

const App: FC<AppProps> = ({ data }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const popup = useAppSelector(selectedModal)
  const dispatch = useAppDispatch()

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev)
  }

  const toggleDelete = () => {
    // setOpenDelete((prev) => !prev)
    dispatch(setModal(''))
  }

  return (
    <Drawer toggle={toggleDrawer} isOpen={openDrawer}>
      <main className='w-full flex-start flex-col gap-5 p-5 max-w-6xl mx-auto'>
        <h1 className='text-primary font-semibold text-2xl'>Expenses</h1>
        {/* <label htmlFor='my-drawer-4' className='drawer-button btn btn-primary'>
        Add new expense
      </label> */}
        <Header toggle={toggleDrawer} />
        <div className='container'>
          <DataTable columns={columns} data={data} />
        </div>
        {popup && <Delete toggle={toggleDelete} />}
      </main>
    </Drawer>
  )
}

export default App
