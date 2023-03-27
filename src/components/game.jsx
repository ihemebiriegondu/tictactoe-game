import React, { useState } from 'react'


export default function Game() {

  const [gameInProgress, setGameInProgress] = useState(true);
  const [winnerGotten, setWinnerGotten] = useState(false);
  const [winner, setWinner] = useState('');

  const players = [
    { playerName: 'player1', playerSymbol: 'X' },
    { playerName: 'player2', playerSymbol: 'O' }
  ]
  const [currentPlayer, setCurrentPlayer] = useState('player1')
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState('X')


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

  const isWinner = (directions) => {
    let directionsTextContents = []
    directions.forEach(direction => {
      directionsTextContents.push(direction.textContent)
    });

    //console.log(directionsTextContents)
    if (directionsTextContents.every((textContent) => textContent === 'X') || directionsTextContents.every((textContent) => textContent === 'O')) {
      setWinnerGotten(true);
      setWinner(currentPlayer);
      setGameInProgress(false)
    }
  }

  const chooseWinner = () => {
    const allBoxes = document.querySelectorAll('.allBoxes');
    let directionBoxesArray = [];
    allBoxes.forEach(box => {
      if (box.classList.contains('horizontalTopBox')) {
        isWinner(document.querySelectorAll('.horizontalTopBox'));
      }

      if (box.classList.contains('horizontalMiddleBox')) {
        isWinner(document.querySelectorAll('.horizontalMiddleBox'));
      }

      if (box.classList.contains('horizontalBottomBox')) {
        isWinner(document.querySelectorAll('.horizontalBottomBox'));
      }
      if (box.classList.contains('verticalLeftBox')) {
        isWinner(document.querySelectorAll('.verticalLeftBox'));
      }

      if (box.classList.contains('verticalMiddleBox')) {
        isWinner(document.querySelectorAll('.verticalMiddleBox'));
      }

      if (box.classList.contains('verticalRightBox')) {
        isWinner(document.querySelectorAll('.verticalRightBox'));
      }

      if (box.classList.contains('diagonal1Box')) {
        isWinner(document.querySelectorAll('.diagonal1Box'));
      }
      if (box.classList.contains('diagonal2Box')) {
        isWinner(document.querySelectorAll('.diagonal2Box'));
      }
    });
  }

  const setPlayerFunction = (e) => {
    //console.log(e.target.textContent)
    if (gameInProgress === true) {
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
  }

  return (
    <>
      <div>
        {
          gameInProgress && (
            <p className={`${winnerGotten ? 'hidden' : 'block'}`}>{currentPlayer}'s turn</p>
          )
        }
        <p className={`${gameInProgress ? 'hidden' : 'block'}`}>Game over</p>
        {
          winnerGotten && (
            <p className=''>{winner} has won</p>
          )
        }
      </div>
      <section className='grid grid-cols-3 w-1/2 p-4 mx-auto bg-blue-200 gap-4 h-fit'>
        <div className='allBoxes horizontalTopBox diagonal1Box verticalLeftBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalTopBox verticalMiddleBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalTopBox verticalRightBox diagonal2Box bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox verticalLeftBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox diagonal1Box diagonal2Box verticalMiddleBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox verticalRightBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox verticalLeftBox diagonal2Box bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox verticalMiddleBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox diagonal1Box verticalRightBox bg-black p-4 rounded-xl text-8xl text-white text-center w-36 h-36'
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
            setGameInProgress(true);
            setWinnerGotten(false);
            setWinner('');
          }}
        >Restart</p>
      </div>
    </>
  )
}
