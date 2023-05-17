'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import Button from '@components/ui/Button'

import { setModal } from '@redux/slices/modalSlice'
import {
  setExpenseName,
  setexpenseAmount,
  setexpenseDescription,
} from '@redux/slices/expenseSlice'
import { useAppDispatch } from '@redux/hooks'
import { Expense } from '@interfaces/expense'

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='outline'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
  {
    accessorKey: 'Description',
    id: 'description',
    cell: ({ row }) => {
      return (
        <div>
          <p className='max-h-[60px] min-w-[170px] overflow-hidden'>
            {row.original.description}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const expense = row.original
      const dispatch = useAppDispatch()

      const handleDeleteClick = () => {
        dispatch(setModal(expense.id))
      }
      const handleEdit = () => {
        dispatch(setExpenseName(expense.name))
        dispatch(setexpenseAmount(expense.amount))
        dispatch(setexpenseDescription(expense.description))
      }

      return (
        <div className='flex-start gap-4'>
          <div onClick={handleEdit}>
            <label
              htmlFor='my-drawer-4'
              className='drawer-button w-9 h-9 rounded-full bg-primary flex-center cursor-pointer hover:bg-opacity-80 active:scale-95'
            >
              <Edit className='text-white w-[18px]' />
            </label>
          </div>
          <Button
            size={'sm'}
            className='bg-red-600 rounded-full'
            onClick={handleDeleteClick}
          >
            <Trash2 className='w-[18px]' />
          </Button>
        </div>
      )
    },
  },
]
