'use client'

import React from 'react'
import { XCircle } from 'lucide-react'
import Button from '@components/ui/Button'
import axios from 'axios'
import { selectedModal } from '@redux/slices/modalSlice'
import { useAppSelector } from '@redux/hooks'
import { useRouter } from 'next/navigation'

interface DeleteProps {
  toggle: () => void
}

const Delete = (props: DeleteProps) => {
  const popup = useAppSelector(selectedModal)
  const router = useRouter()
  const toggleOpen = () => {
    props.toggle()
  }

  const DeleteItem = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/expenses/${popup}/delete`
    )
    toggleOpen()
    router.refresh()
  }

  return (
    <div className='fixed flex justify-center items-center top-0 left-0 z-50 w-full h-full'>
      <div
        className='w-full h-full bg-black opacity-40'
        onClick={toggleOpen}
      ></div>
      <div className='absolute max-w-[90vw] w-[500px] h-[250px] max-h-[90%] bg-white flex flex-col rounded-[20px] p-5 overflow-y-auto'>
        <div className='w-full flex justify-end items-end'>
          <XCircle
            className='w-7 text-red-600 cursor-pointer'
            onClick={toggleOpen}
          />
        </div>
        <div className='w-full h-full flex justify-evenly items-start flex-col px-5'>
          <div className='w-full flex justify-center items-center'>
            <h1 className='md:text-xl text-center text-primary font-interBold'>
              Are you sure you want to delete this Expense?
            </h1>
          </div>
          <Button size={'lg'} className='w-full' onClick={DeleteItem}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Delete
