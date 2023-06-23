import React, { useState, useEffect } from 'react'
import { IoReturnUpBack } from 'react-icons/io5'
import { MdArrowDropDown } from 'react-icons/md'
import Head from 'next/head'
import Link from 'next/link'
import SinglePlayerGame from '@/components/singlePlayerGame'
import PlayersSelect from '@/components/playersSelect';

export default function SinglePlayer() {

    const [isUserInfoEntered, setIsUserInfoEntered] = useState(false);
    const [player1Symbol, setPlayer1Symbol] = useState('');
    const [player2Symbol, setPlayer2Symbol] = useState('');

    const [isEasy, setIsEasy] = useState(false);
    const [isMedium, setIsMedium] = useState(true);
    const [isHard, setIsHard] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const closeDropDown = (e) => {
        const target = e.target
        if (target.dataset.targetElement !== 'dropDown') {
            setShowDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeDropDown)
    })

    return (
        <>
            <Head>
                <title>Tic Tac Toe App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='bg-blackPurple absolute h-full w-full overflow-x-hidden'>
                <div className={`${isUserInfoEntered ? 'pt-8' : 'pt-40'}`}>
                    <div className=''>
                        <Link href='/selectGame' className={`bg-lightSecondary block absolute top-8 left-4 md:p-4 p-3 rounded-full cursor-pointer ${isUserInfoEntered ? 'hidden' : 'block'}`}>
                            <IoReturnUpBack className='lg:text-2xl text-xl text-primary' />
                        </Link>

                        <div className={`${isUserInfoEntered ? 'hidden' : 'block'}`}>
                            <div className={`bg-gold shadow-sm block absolute top-8 right-4 lg:p-2 md:p-3 p-2 rounded-full cursor-pointer transition duration-300 ease-in hover:bg-gold/[.95] hover:duration-300 hover:ease-in`}
                                data-target-element='dropDown' onClick={() => { setShowDropdown(!showDropdown) }}
                            >
                                <MdArrowDropDown className='lg:text-4xl text-3xl text-primary' data-target-element='dropDown' onClick={(e) => { setShowDropdown(!showDropdown);}} />
                            </div>

                            {/* dropdown div */}
                            <div className={`absolute top-24 bg-gold py-3 px-4 lg:text-sm text-xs text-secondary rounded-md transition-all duration-500 ease-in-out ${showDropdown ? 'right-4' : '-right-24'}`}>
                                <p className={`mb-2 cursor-pointer ${isEasy ? 'text-black' : 'text-secondary'}`} onClick={() => {setIsEasy(true); setIsMedium(false); setIsHard(false)}}>Easy</p>
                                <p className={`mb-2 cursor-pointer ${isMedium ? 'text-black' : 'text-secondary'}`} onClick={() => {setIsEasy(false); setIsMedium(true); setIsHard(false)}}>Medium</p>
                                <p className={`cursor-pointer ${isHard ? 'text-black' : 'text-secondary'}`} onClick={() => {setIsEasy(false); setIsMedium(false); setIsHard(true)}}>Hard</p>
                            </div>
                        </div>
                    </div>
                    <PlayersSelect isUserInfoEntered={setIsUserInfoEntered} player1Symbol={setPlayer1Symbol} player2Symbol={setPlayer2Symbol} isSinglePlayer={true} />
                </div>

                {
                    isUserInfoEntered && (
                        <div className='pb-12'>
                            <SinglePlayerGame player1Name={'You'} player1Symbol={player1Symbol} player2Name={'Computer'} player2Symbol={player2Symbol} isEasy={isEasy} isMedium={isMedium} isHard={isHard} />
                        </div>
                    )
                }
            </div>
        </>
    )
}
