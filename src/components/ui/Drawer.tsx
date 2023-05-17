'use client'

import { FC, ReactNode, useEffect, useState } from 'react'
import { Input } from '@components/ui/Input'
import { Textarea } from '@components/ui/Textarea'
import Button from '@components/ui/Button'
import { toast } from '@components/ui/Toast'
import { useRouter } from 'next/navigation'
import { createSchema } from '@/schema/expenses.schema'
import axios from 'axios'
import { useFormik } from 'formik'
import { useAppSelector } from '@redux/hooks'
import { selectedExpense } from '@redux/slices/expenseSlice'

interface DrawerProps {
  children: ReactNode
  isOpen: boolean
  toggle: () => void
}

const Drawer: FC<DrawerProps> = ({ children, isOpen, toggle }) => {
  const router = useRouter()
  const editExpense = useAppSelector(selectedExpense)

  const [isChecked, setIsChecked] = useState<boolean>(isOpen)
  const [isLoading, setIsLoading] = useState<boolean>(isOpen)

  useEffect(() => {
    setIsChecked(isOpen)
  }, [isOpen])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
    toggle()
  }

  const refreshData = () => {
    router.refresh()
  }

  const onSubmit = async (values: {
    name: string
    amount: number
    description: string
  }): Promise<any | void> => {
    try {
      setIsLoading((prev) => !prev)
      const response = await axios.post('api/expenses/create', values)

      if (response?.status === 201) {
        toggle()
        refreshData()
        toast({
          type: 'success',
          message: 'Expense added successfully',
        })
        values.name = ''
        values.amount = 0
        values.description = ''
      } else {
        toast({
          type: 'error',
          message: 'Error',
        })
      }
    } catch (error) {
      toast({
        type: 'error',
        message: error as string,
      })
    } finally {
      setIsLoading((prev) => !prev)
    }
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: editExpense.name ? editExpense.name : '',
      amount: editExpense.amount ? editExpense.amount : '',
      description: editExpense.description ? editExpense.description : '',
    },
    validationSchema: createSchema.body,
    onSubmit,
  })

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <form
      className='drawer drawer-end'
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <input
        id='my-drawer-4'
        type='checkbox'
        className='drawer-toggle'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className='drawer-content'>{children}</div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-4' className='drawer-overlay'></label>
        <div className='menu p-4 w-80 bg-base-100 text-base-content'>
          <div className='w-full flex-start flex-col gap-5'>
            <h3 className='text-primary font-medium'>Add New Expense</h3>
            <Input
              name='name'
              placeholder='Expense name...'
              value={values.name}
              onChange={handleChange}
              className='w-full'
            />
            <Input
              name='amount'
              type='number'
              placeholder='Expense amount...'
              value={values.amount}
              onChange={handleChange}
              className='w-full'
            />
            <Textarea
              name='description'
              className='resize-none'
              placeholder='Expense description...'
              value={values.description}
              onChange={handleChange}
            />
            <div className='w-full flex-between'>
              <Button type='submit' isLoading={isLoading}>
                Submit
              </Button>
              <label
                htmlFor='my-drawer-4'
                className='drawer-button h-10 py-2 px-4 bg-red-600 text-white font-medium transition-color outline-none rounded-md text-sm flex-center cursor-pointer hover:bg-opacity-80 active:scale-95'
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Drawer
