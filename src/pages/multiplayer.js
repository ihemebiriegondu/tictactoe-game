import React, { useState } from 'react'
import Head from 'next/head'
import PlayersSelect from '@/components/playersSelect'
import MultiplayerGame from '@/components/multiplayerGame'

export default function Multiplayer() {

  const [isUserInfoEntered, setIsUserInfoEntered] = useState(false);
  const [player1Symbol, setPlayer1Symbol] = useState('')
  const [player2Symbol, setPlayer2Symbol] = useState('')

  return (
    <div className=''>
      <Head>
        <title>Tic Tac Toe App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-blackPurple absolute h-full w-full'>
        <div className={`${isUserInfoEntered ? 'pt-8' : 'pt-40'}`}>
          <PlayersSelect isUserInfoEntered={setIsUserInfoEntered} player1Symbol={setPlayer1Symbol} player2Symbol={setPlayer2Symbol} />
        </div>

        {
          isUserInfoEntered && (
            <div className='pb-12'>
              <MultiplayerGame isSinglePlayer={false} isMultiplePlayer={true} player1Name={'Player 1'} singlePlayerTag={'Your'} player1Symbol={player1Symbol} player2Name={'Player 2'} player2Symbol={player2Symbol} />
            </div>
          )
        }
      </div>
    </div>
  )
}
