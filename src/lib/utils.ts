import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getFormattedDate = (date?: Date): string => {
  if (date == null) {
    date = new Date()
  }

  const year = String(date.getFullYear())
  let month = String(date.getMonth() + 1)
  let day = String(date.getDate())
  let hour = String(date.getHours())
  let min = String(date.getMinutes())
  let sec = String(date.getSeconds())

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
}
