import React from 'react'
import starImage from '../images/icons8-hand-drawn-star-60.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Intro() {
    return (
        <div className='py-16 overflow-hidden relative'>
            <div className='text-5xl flex flex-col uppercase justify-center items-center font-black'>
                <p className='text-primary mb-4'>tic</p>
                <p className='text-gold mb-4'>tac</p>
                <p className='text-lightSecondary mb-4'>toe</p>
            </div>

            <div className='flex justify-center items-center font-bold text-7xl mt-24'>
                <p className='playing-text text-primary md:mr-32 mr-8'>X</p>
                <p className='playing-text text-secondary'>O</p>
            </div>

            <div className='flex justify-center mt-20'>
                <Link href={'/selectGame'} className='bg-white block text-center py-4 w-8/12 mx-auto shadow shadow-lightSecondary rounded-3xl md:text-2xl text-base transition duration-300 hover:shadow-md hover:shadow-lightSecondary'>Let's play</Link>
            </div>

            <div>
                <div>
                    <div className='absolute z-10 w-20 h-10 md:left-0 -left-3 top-20'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="star"
                            src={starImage}
                            fill
                        />
                    </div>
                    <div className='absolute z-10 w-20 h-10 md:right-0 -right-3 top-20'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="star"
                            src={starImage}
                            fill
                        />
                    </div>
                </div>
                <div>
                    <div className='absolute z-10 w-28 h-16 md:left-10 left-6 top-64'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="star"
                            src={starImage}
                            fill
                        />
                    </div>
                    <div className='absolute z-10 w-28 h-16 md:right-10 right-6 top-64'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="star"
                            src={starImage}
                            fill
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
