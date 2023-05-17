import App from '@components/App'
import axios from 'axios'

const Page = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/expenses/read`
  )

  return <App data={response.data.data} />
}

export default Page
