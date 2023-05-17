import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ModalProps {
  modal: string
  id: number
}

const initialState: ModalProps = {
  modal: '',
  id: 0,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
      state.modal = action.payload
    },
    setModalId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
  },
})

export const { setModal, setModalId } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedModal = (state: RootState) => state.modal.modal
export const selectedModalId = (state: RootState) => state.modal.id

export default modalSlice.reducer
