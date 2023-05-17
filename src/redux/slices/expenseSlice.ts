import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Expense } from '@interfaces/expense'

const initialState: Expense = {
  id: '',
  name: '',
  amount: 0,
  description: '',
  created: '',
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenseName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setexpenseAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload
    },
    setexpenseDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
  },
})

export const { setExpenseName, setexpenseAmount, setexpenseDescription } =
  expenseSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedExpense = (state: RootState) => state.expense

export default expenseSlice.reducer
