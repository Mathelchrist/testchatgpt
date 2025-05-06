
import Head from 'next/head'
import MealTrackerApp from '../components/ui/MealTrackerApp'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Plan Alimentaire</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MealTrackerApp />
    </div>
  )
}
