import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'

export default function WinnerModal({ isWinner, name, imageSrc, playAgainButtonClick }) {

    return (
        <div className='bg-gold rounded-2xl py-4 px-4 relative'>
            <div className='flex flex-col items-center'>
                {
                    isWinner && (
                        <p className='md:text-3xl text-2xl text-center text-blackPurple font-bold'>{name} won! </p>
                    )
                }
                <p className={`md:text-3xl text-2xl text-center text-blackPurple font-bold ${isWinner ? 'hidden' : 'block'}`}> Draw </p>

                <div className='relative w-11/12 h-32 top-0'>
                    <Image
                        className="object-scale-down absolute w-full h-full"
                        alt="fireworks"
                        src={imageSrc}
                        fill
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <button className='md:text-base text-sm bg-blackPurple py-2 px-3 rounded-2xl text-lightSecondary shadow shadow-black hover:shadow-md hover:shadow-black transition duration-300 ease-in-out'
                    onClick={playAgainButtonClick}
                >Play Again</button>
                <Link href='/selectGame' className='md:text-base text-sm bg-blackPurple py-2 px-6 rounded-2xl text-lightSecondary shadow shadow-black hover:shadow-md hover:shadow-black transition duration-300 ease-in-out'>Back</Link>
            </div>
        </div>
    )
}
