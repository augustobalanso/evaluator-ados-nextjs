import Image from 'next/image'
import Header from './components/header/Header.jsx'
import { getServerSession } from 'next-auth'
import { Options } from './api/auth/[...nextauth]/route.js'

export default async function Home() {

  const session = await getServerSession(Options)

  return (
    <section>
      <Header />
      {session ? <Image src={`${session.user?.image || ''}`} alt='sessionImg' width={128} height={128} /> : null}
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>  
  )
}
