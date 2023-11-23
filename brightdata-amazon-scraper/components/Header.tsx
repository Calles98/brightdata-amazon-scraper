'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React, { FormEvent, useRef } from 'react'

function Header() {

    const inputRef = useRef<HTMLFormElement>(null);  

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const input = inputRef.current?.value; 

        if (!input) return; 

        if (input) {
            inputRef.current.value = ''; 
        }

        try {
            // Call out api to activate scraper
        } catch (error) {
            // Handle any errors
            
        }

        // Wait for response to come back


    }
    return (
        <header>
            <form
            onSubmit={handleSearch}
            className='flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-md mx-auto'
            action=""
            >
                <input type="text" placeholder='Search...' className='flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300' />
                <button hidden>Search</button>
                <MagnifyingGlassIcon className='h-6 w-6 text-indigo-300' />
            </form>
        </header>
    )
}

export default Header