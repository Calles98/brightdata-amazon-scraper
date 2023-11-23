import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <DocumentMagnifyingGlassIcon className='h-64 w-64 text-indigo-600/20' />
        <h1 className='text-3xl ml-2 mt-2 text-black text-center font-bold mb-5'>Welcome to the Amazon Web Scraper</h1>
        <h2 className='text-xl font-bold text-indigo-500/20'>Project following a tutorial by Sonny Sangha</h2>
      </div>
    </main>
  )
}
