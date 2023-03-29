import React, { useState } from 'react'

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
        <form className={`bg-secondary 2xl:w-1/3 lg:w-1/2 sm:w-10/12 w-11/12 mx-auto px-6 py-8 rounded-3xl shadow-lg ${isGameTypeSelected ? 'hidden' : 'block'}`} onSubmit={(e) => { handleGameTypeSubmit(e) }}>
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
        </form>
    )
}
