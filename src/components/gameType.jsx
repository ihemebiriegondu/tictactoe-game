import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import oneplayer from '../images/one-player-game-symbol.png'
import twoplayers from '../images/two-players-game-interface-symbol.png'
import challenge from '../images/image 3.png'

export default function GameType() {
    return (
        <div className='flex flex-col md:px-12 sm:px-8 px-4'>
            <Link href={'/singlePlayer'} className='flex justify-center items-center w-full mb-8 animate-slidedown cursor-pointer group'>
                <div className='bg-gold relative z-20 p-4 rounded-full flex-none transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>
                    <div className='relative z-20 w-16 h-16'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="oneplayer"
                            src={oneplayer}
                            fill
                        />
                    </div>
                </div>
                <p className='bg-amber-500 border-2 rounded-3xl border-primary text-white py-3 grow text-center -ml-12 pl-8 transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>Single Player</p>
            </Link>
            <Link href={'/multiplayer'} className='flex justify-center items-center w-full mb-8 animate-slidedown cursor-pointer group'>
                <div className='bg-teal-400 relative z-20 p-4 rounded-full flex-none transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>
                    <div className='relative z-20 w-16 h-16'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="oneplayer"
                            src={twoplayers}
                            fill
                        />
                    </div>
                </div>
                <p className='bg-cyan-400 border-2 rounded-3xl border-primary text-white py-3 grow text-center -ml-12 pl-8 transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>Multiplayer</p>
            </Link>
            <div className='flex justify-center items-center w-full animate-slidedown cursor-pointer group'>
                <div className='bg-fuchsia-600 relative z-20 p-4 rounded-full flex-none transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>
                    <div className='relative z-20 w-16 h-16'>
                        <Image
                            className="object-scale-down absolute w-full h-full"
                            alt="oneplayer"
                            src={challenge}
                            fill
                        />
                    </div>
                </div>
                <p className='bg-purple-600 border-2 rounded-3xl border-primary text-white py-3 grow text-center -ml-12 pl-8 transition duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-primary'>Challenges</p>
            </div>
        </div>
    )
}
