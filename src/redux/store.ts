import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@redux/slices/modalSlice'
import expenseReducer from '@redux/slices/expenseSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    expense: expenseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
