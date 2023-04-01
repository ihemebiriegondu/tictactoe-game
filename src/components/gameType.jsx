import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import oneplayer from '../images/one-player-game-symbol.png'
import twoplayers from '../images/two-players-game-interface-symbol.png'
import challenge from '../images/image 3.png'

export default function GameType(props) {

    const [isGameTypeSelected, setIsGameTypeSelected] = useState(false);
    const [isMultiPlayer, setIsMultiplayer] = useState(false);
    const [isSinglePlayer, setIsSinglePlayer] = useState(false);

    const handleGameTypeSubmit = (e) => {
        e.preventDefault();
        if (isSinglePlayer != '' || isMultiPlayer != '') {
            props.isDoublePlayer(isMultiPlayer);
            props.isSinglePlayer(isSinglePlayer);
            setIsGameTypeSelected(true);
        }
    }

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
            <Link href={'/multiPlayer'} className='flex justify-center items-center w-full mb-8 animate-slidedown cursor-pointer group'>
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
    {/*<form className={`bg-secondary 2xl:w-1/3 lg:w-1/2 sm:w-10/12 w-11/12 mx-auto px-6 py-8 rounded-3xl shadow-lg ${isGameTypeSelected ? 'hidden' : 'block'}`} onSubmit={(e) => { handleGameTypeSubmit(e) }}>
            <h1 className="text-center lg:text-xl md:text-lg text-base font-bold text-primary mb-3">Select number of players</h1>
            <div className="flex flex-col">
                <div className='mb-3 flex items-center'>
                    <input className="accent-primary appearance-none border-2 rounded-full border-primary bg-transparent checked:bg-primary outline-none w-4 h-4 cursor-pointer"
                        value='singlePlayer' type={'radio'} name='playerNo' id="singlePlayer" onClick={() => { setIsSinglePlayer(true); setIsMultiplayer(false) }} />
                    <label htmlFor="singlePlayer" className="ml-2 cursor-pointer mb-0 md:text-base text-sm">Single player (with computer)</label>
                </div>
                <div className='flex items-center'>
                    <input className="accent-primary appearance-none border-2 rounded-full border-primary bg-transparent checked:bg-primary outline-none w-4 h-4 cursor-pointer"
                        value='multiPlayers' type={'radio'} name='playerNo' id="multiPlayers" onClick={() => { setIsMultiplayer(true); setIsSinglePlayer(false) }} />
                    <label htmlFor="multiPlayers" className="ml-2 cursor-pointer mb-0 md:text-base text-sm">Multiple players (2)</label>
                </div>
            </div>
            <div className="flex justify-center pt-6">
                <button className="mx-auto bg-primary text-white py-2 px-8 rounded-xl font-bold">Next</button>
            </div>
    </form>*/}
}
