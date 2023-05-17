import '@styles/globals.css'
import { Roboto } from 'next/font/google'
import { Providers } from '@redux/provider'
import { Toaster } from '@components/ui/Toast'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata = {
  title: 'Expenses',
  description:
    'Expenses manager where you can add, edit or delete your expenses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <Providers>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>{children}</main>
          <Toaster position='top-center' />
        </Providers>
      </body>
    </html>
  )
}
