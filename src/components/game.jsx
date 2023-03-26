import React, { useState, useEffect } from 'react'


export default function Game() {

  const [gameInProgress, setGameInProgress] = useState(true)

  const [players, setPlayers] = useState([
    { playerName: 'player1', playerSymbol: 'x' },
    { playerName: 'player2', playerSymbol: 'o' }
  ])
  const [currentPlayer, setCurrentPlayer] = useState('player1')
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState('x')


  const endTestFunction = () => {
    const allBoxes = document.querySelectorAll('.allBoxes');
    let textContents = []
    allBoxes.forEach(box => {
      textContents.push(box.textContent)
    });
    //check if all the boxes are empty so as to end the game
    if (textContents.every((textContent) => textContent != '')) {
      setGameInProgress(false)
    }
  }

  const chooseWinner = () => {
    const horzontalTopBoxes = document.querySelectorAll('.horzontalTopBox');
    const horzontalMiddleBoxes = document.querySelectorAll('.horzontalMiddleBox');
    const horzontalBottomBoxes = document.querySelectorAll('.horzontalBottomBox');

    const verticalLeftBoxes = document.querySelectorAll('.verticalLeftBox');
    const verticalMiddleBoxes = document.querySelectorAll('.verticalMiddleBox');
    const verticalRightBoxes = document.querySelectorAll('.verticalRightBox');

    const diagonal1Boxes = document.querySelectorAll('.diagona1Box');
    const diagonal2Boxes = document.querySelectorAll('.diagonal2Box');

    
  }

  const setPlayerFunction = (e) => {
    //console.log(e.target.textContent)
    if (e.target.textContent === '') {
      e.target.textContent = currentPlayerSymbol
      players.forEach(player => {
        if (player.playerName != currentPlayer) {
          setCurrentPlayer(player.playerName)
          setCurrentPlayerSymbol(player.playerSymbol)
        }
      });
    }

    endTestFunction()
    chooseWinner()
  }

  return (
    <>
      <div>
        <p className={`${gameInProgress ? 'block' : 'hidden'}`}>{currentPlayer}'s turn</p>
        <p className={`${gameInProgress ? 'hidden' : 'block'}`}>Game over</p>
      </div>
      <section className='grid grid-cols-3 w-1/2 p-4 mx-auto bg-blue-200 gap-4 h-fit'>
        <div className='allBoxes horzontalTopBox diagonal1Box verticalLeftBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalTopBox verticalLeftBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalTopBox verticalLeftBox diagonal2Box bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalMiddleBox verticalMiddleBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalMiddleBox diagonal1Box diagonal2Box verticalMiddleBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalMiddleBox verticalMiddleBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalBottomBox verticalRightBox diagonal2Box bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalBottomBox verticalRightBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horzontalBottomBox diagonal1Box verticalRightBox bg-black p-4 rounded-xl text-9xl text-white flex flex-col justify-center items-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
      </section>

      <div>
        <p className={`${gameInProgress ? 'hidden' : 'block'}`}
          onClick={() => {
            const allBoxes = document.querySelectorAll('.allBoxes');
            allBoxes.forEach(box => {
              box.textContent = ''
            });
            setCurrentPlayer(players[0].playerName)
            setCurrentPlayerSymbol(players[0].playerSymbol)
            setGameInProgress(true)
          }}
        >Restart</p>
      </div>
    </>
  )
}
