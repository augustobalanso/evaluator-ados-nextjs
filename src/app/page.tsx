'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from 'react-bootstrap'
import Image from 'next/image'
import Header from './components/header/Header.jsx'

export default function Home() {

  const { data: session } = useSession()

  return (
    <section>
      <Header />
      {session ? <Image src={`${session.user?.image || ''}`} alt='sessionImg' width={128} height={128} /> : null}
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      {session 
      ? 
        <Button onClick={() => signOut()}>Sign Out</Button>
      : 
        <Button><Link href="/signIn">Sign In</Link></Button>
      }
      
    </section>  
  )
}
