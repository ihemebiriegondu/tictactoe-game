import React from 'react'
import { useState } from 'react'

export default function SinglePlayerForm(props) {

    const [userEntered, setUserEntered] = useState(false);
    const [player1, setPlayer1] = useState('');
    const [player1Symbol, setPlayer1Symbol] = useState('');
    const [player2Symbol, setPlayer2Symbol] = useState('');

    const handleSinglePlayerForm = (e) => {
        e.preventDefault();
        if (player1 != '' && player1Symbol != '') {
            setUserEntered(true);
            props.userEntered(true);
            props.player1(player1);
            props.player2('Computer');
            props.player1Symbol(player1Symbol);
            props.player2Symbol(player2Symbol);
        }
    }

    return (
        <form className={`bg-secondary w-1/3 mx-auto px-6 py-8 rounded-3xl shadow-lg ${userEntered ? 'hidden' : 'block'}`} onSubmit={(e) => { handleSinglePlayerForm(e) }}>
            <h1 className="text-center text-xl font-bold text-primary mb-6">Enter Players info</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="player1Name" className="font-medium">Player's name</label>
                <input className="mt-2 bg-transparent border-2 rounded-xl px-2 py-3 border-primary outline-none" type={'text'} id='player1Name' onChange={(e) => setPlayer1(e.target.value)} />
            </div>
            <div className="flex flex-col mb-4">
                <p className="font-medium mb-2">Player's symbol</p>
                <div className="flex justify-around items-center">
                    <div>
                        <input className="accent-primary caret-primary bg-transparent outline-none w-4 h-4 cursor-pointer"
                            value='X' type={'radio'} name='symbol' id="symbol1" onClick={(e) => { setPlayer1Symbol(e.target.value); setPlayer2Symbol('O') }} />
                        <label htmlFor="symbol1" className="text-xl ml-2 font-bold cursor-pointer">X</label>
                    </div>
                    <div>
                        <input className="accent-primary caret-primary bg-transparent outline-none w-4 h-4 cursor-pointer"
                            value='O' type={'radio'} name='symbol' id="symbol2" onClick={(e) => { setPlayer1Symbol(e.target.value); setPlayer2Symbol('X') }} />
                        <label htmlFor="symbol2" className="text-xl ml-2 font-bold cursor-pointer">O</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-6">
                <button className="mx-auto bg-primary text-white py-4 px-6 rounded-xl font-bold">Start game</button>
            </div>
        </form>
    )
}
