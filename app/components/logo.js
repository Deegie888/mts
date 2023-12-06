'use client'

import Image from "next/image"

export default function Logo () {
    return (
        <div className='flex justify-center'>
            <Image 
              src={'/images/tataramon-logo.png'}
              width={200}
              height={130}
              alt='logo'
            />
        </div>
    )
}