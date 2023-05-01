import React, { useState } from 'react'
import { HiOutlinePaintBrush } from 'react-icons/hi2'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'

export default function PlayersSelect(props) {

    const [userEntered, setUserEntered] = useState(false);
    const symbols = [
        { symbol1: 'X', symbol2: 'O' },
    ]
    const [player1, setPlayer1Symbol] = useState(symbols[0].symbol1);
    const [player2, setPlayer2Symbol] = useState(symbols[0].symbol2);


    const startGame = () => {
        setUserEntered(true)
        props.isUserInfoEntered(true)
        props.player1Symbol(player1)
        props.player2Symbol(player2)
    }

    const switchSymbols = () => {
        setPlayer1Symbol(player2)
        setPlayer2Symbol(player1)
    }

    const shuffleSymbols = () => {

    }

    return (
        <div className={`h-full ${userEntered ? 'hidden' : 'block'}`}>
            <div className='flex items-center justify-around h-full'>
                <div className='bg-lightSecondary rounded-2xl p-2 pt-4 ring-inset ring ring-gold'>
                    <p className={`md:text-base text-sm font-bold mb-3 text-center ${props.isSinglePlayer ? 'hidden' : 'block'}`}>Player 1</p>
                    <p className={`md:text-base text-sm font-bold mb-3 text-center ${props.isSinglePlayer ? 'block' : 'hidden'}`}>You</p>
                    <div className='bg-blackPurple rounded-2xl flex justify-center p-4'>
                        <p className='playing-text text-primary font-bold text-6xl text-center [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)]'>{player1}</p>
                    </div>
                </div>
                <p className='font-bold text-gold text-5xl [text-shadow:_0_6px_0_rgb(0_0_0_/_40%)]'>VS</p>
                <div className='bg-lightSecondary rounded-2xl p-2 pt-4 ring-inset ring ring-gold'>
                    <p className={`md:text-base text-sm font-bold mb-3 text-center ${props.isSinglePlayer ? 'hidden' : 'block'}`}>Player 2</p>
                    <p className={`md:text-base text-sm font-bold mb-3 text-center ${props.isSinglePlayer ? 'block' : 'hidden'}`}>Computer</p>
                    <div className='bg-blackPurple rounded-2xl flex justify-center p-4'>
                        <p className='playing-text text-secondary font-bold text-6xl text-center [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)]'>{player2}</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-4'>
                <div className='ring-inset ring-2 ring-gold p-3 rounded-full text-white bg-lightSecondary/[.1] transition duration-200 ease-in-out group hover:bg-gold mr-4' onClick={() => { shuffleSymbols() }}>
                    <HiOutlinePaintBrush className='text-xl group-hover:text-secondary' />
                </div>
                <div className='ring-inset ring-2 ring-gold p-3 rounded-full text-white bg-lightSecondary/[.1] transition duration-200 ease-in-out group hover:bg-gold mr-4' onClick={() => { switchSymbols() }}>
                    <HiOutlineSwitchHorizontal className='text-xl group-hover:text-secondary' />
                </div>
            </div>

            <div className='flex justify-center mt-20'>
                <button onClick={() => { startGame() }} className='bg-white block text-center py-4 w-8/12 mx-auto shadow shadow-lightSecondary rounded-3xl md:text-2xl text-base transition duration-300 hover:shadow-md hover:shadow-lightSecondary'>Start</button>
            </div>
        </div>
    )
}
