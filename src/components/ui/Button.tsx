import { cn } from '@lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ButtonHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-opacity-80',
        outline: 'bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  href,
  size,
  type,
  ...props
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  )
}

export default Button
