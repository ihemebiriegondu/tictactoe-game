import React, { useState, useEffect } from 'react'


export default function Game() {

  const [players, setPlayers] = useState(['player1', 'player2'])
  const [currentPlayer, setCurrentPlayer] = useState('player1')

  return (
    <section className='grid grid-cols-3 w-1/2 p-4 mx-auto bg-blue-200 gap-4'>
      <div className='bg-black py-10 rounded-xl'
        onClick={() => {
            console.log(currentPlayer);
            
        }}
      ></div>
      <div className='bg-black py-10 rounded-xl'></div>
      <div className='bg-black py-10 rounded-xl'></div>
    </section>
  )
}
