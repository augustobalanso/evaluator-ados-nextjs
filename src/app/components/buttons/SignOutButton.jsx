'use client'

import { Button } from 'react-bootstrap'
import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut()}>SignOut</Button>
  )
}
