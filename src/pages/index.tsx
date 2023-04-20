import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Seo from '../components/Seo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Seo title="Social Media Belt - Home" description='Home do sistema'/>
      
      <h1>Social Media Belt</h1>

      <ul>
        <li><Link href='/app'>App</Link></li>
        <li><Link href='/itau'>Itau</Link></li>
      </ul>
    </div>
  )
}
