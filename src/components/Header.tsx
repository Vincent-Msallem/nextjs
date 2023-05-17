'use client'

import { FC } from 'react'
import {
  setModal,
  selectedModal,
  selectedModalId,
} from '@redux/slices/modalSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import Button from '@components/ui/Button'

interface HeaderProps {
  toggle: () => void
}

const Header: FC<HeaderProps> = ({ toggle }) => {
  const popup = useAppSelector(selectedModal)
  const popupId = useAppSelector(selectedModalId)
  const dispatch = useAppDispatch()

  return (
    // <label htmlFor='my-drawer-4' className='drawer-button btn btn-primary'>
    //   Add new expense
    // </label>
    <Button onClick={() => toggle()}>Add new expense</Button>
  )
}

export default Header
