import HeaderLink from "./HeaderLink"
import SignOutButton from '../buttons/SignOutButton'
import { getServerSession } from "next-auth"
import { Options } from "@/app/api/auth/[...nextauth]/route"

export default async function Header() {

  const session = await getServerSession(Options)

  return (
    <header className="bg-[#061A40] dark:bg-[#131313] py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white font-bold text-xl">Evaluator ADOS</div>
        <nav className="space-x-4">
        <HeaderLink href="/">Home</HeaderLink>
          {  !session
          ? 
          <>
              <HeaderLink href="/signIn">SignIn</HeaderLink>
              <HeaderLink href="/signUp">SignUp</HeaderLink>
          </>
          : <SignOutButton />}
          
        </nav>
      </div>
    </header>
  )
}