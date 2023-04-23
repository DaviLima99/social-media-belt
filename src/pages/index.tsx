import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Seo from '../components/Seo'
import { useSession, signIn, signOut } from "next-auth/react"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
      <Seo title="Social Media Belt - Home" description='Home do sistema'/>
      
      <h1>Social Media Belt</h1>

      <ul>
        <li><Link href='/app'>App</Link></li>
        <li><Link href='/itau'>Itau</Link></li>
      </ul>
      <p>
        <button onClick={() => signIn()}>Sign in</button>
      </p>
      <p>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </p>
    </div>
  )
}
