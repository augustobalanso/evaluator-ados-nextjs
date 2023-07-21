import Link from "next/link"

export default function Header() {
  return (
    <header>
        <Link href="/">Home</Link>
        <Link href="/signIn">SignIn</Link>
        <Link href="/signUp">SignUp</Link>
        <Link href="/signOut">SignOut</Link>
    </header>
  )
}