import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import celebrationGif from '../images/icegif-85.gif'

export default function Game({ player1Name, player2Name, player1Symbol, player2Symbol, isSinglePlayer }) {

  const [winnerGotten, setWinnerGotten] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [winner, setWinner] = useState('');
  const [computerPlayed, setComputerPlayed] = useState(false);

  const players = [
    { playerName: player1Name, playerSymbol: player1Symbol },
    { playerName: player2Name, playerSymbol: player2Symbol }
  ]
  const [currentPlayer, setCurrentPlayer] = useState(player1Name)
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState(players[0].playerSymbol);


  useEffect(() => {
    if (isSinglePlayer) {
      chooseWinner();

      if (winnerGotten) {
        setGameInProgress(false);
        //console.log('gotten');
        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
          clearTimeout(i);
        }
      }
    }
  })


  const endTestFunction = () => {
    const allBoxes = document.querySelectorAll('.allBoxes');
    let textContents = []
    allBoxes.forEach(box => {
      textContents.push(box.textContent)
    });
    //check if all the boxes are filled so as to end the game
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
      //setWinner(currentPlayer);
      setGameInProgress(false);
      //console.log(directionsTextContents)
      const winnerSymbol = directionsTextContents[0]
      //console.log(winnerSymbol)

      if (computerPlayed === true) {
        if (winnerSymbol === player2Symbol) {
          setCurrentPlayer(player2Name)
          setWinner(player2Name)
          //console.log(winner)
        }
      } else {
        setCurrentPlayer(player1Name)
        setWinner(currentPlayer);
      }
    }
  }

  const chooseWinner = () => {
    const allBoxes = document.querySelectorAll('.allBoxes');
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

  const computerPlayer = () => {
    const allBoxes = document.querySelectorAll('.allBoxes');
    const allBoxesTextContent = [];
    const allEmptyBoxesIndex = [];

    allBoxes.forEach(box => {
      allBoxesTextContent.push(box.textContent);
    });

    for (let i = 0; i < allBoxesTextContent.length; i++) {
      if (allBoxesTextContent[i] === '') {
        //console.log(i)
        allEmptyBoxesIndex.push(i)
      }
    }
    //console.log(allEmptyBoxesIndex)
    const randomBox = allEmptyBoxesIndex[Math.floor(Math.random() * allEmptyBoxesIndex.length)];
    //console.log(randomBox)
    players.forEach(player => {
      setCurrentPlayer(player.playerName)
      setCurrentPlayerSymbol(player.playerSymbol)
    });
    if (gameInProgress === true) {
      setTimeout(() => {
        if (randomBox != undefined) {
          console.log('time out')
          allBoxes[randomBox].textContent = player2Symbol

          setCurrentPlayer(players[0].playerName);
          setCurrentPlayerSymbol(players[0].playerSymbol);
          setComputerPlayed(true)
        }
      }, 1000);
    }
    setComputerPlayed(false);
  }

  const setPlayerFunction = (e) => {
    //console.log(e.target.textContent)
    if (gameInProgress === true) {
      if (e.target.textContent === '') {

        if (isSinglePlayer) {
          e.target.textContent = currentPlayerSymbol
          computerPlayer();
        } else {
          e.target.textContent = currentPlayerSymbol
          players.forEach(player => {
            if (player.playerName != currentPlayer) {
              setCurrentPlayer(player.playerName)
              setCurrentPlayerSymbol(player.playerSymbol)
            }
          });
          chooseWinner();
        }

      }
      endTestFunction();
    }
  }

  return (
    <>
      <div className='px-8 relative mb-4'>
        {
          gameInProgress && (
            <p className={`${winnerGotten ? 'hidden' : 'block'} text-primary font-bold text-3xl capitalize text-center mb-6`}>{currentPlayer}'s turn</p>
          )
        }
        <p className={`${gameInProgress ? 'hidden' : 'block'} text-primary font-bold text-3xl capitalize text-center mb-6`}>Game over</p>
        {
          winnerGotten && (
            <p className='text-center text-primary text-3xl uppercase font-extrabold'>{winner} won!!!</p>
          )
        }
      </div>

      {
        winnerGotten && (
          <div className='absolute z-10 w-full h-full'>
            <Image
              className="object-scale-down absolute w-full h-full"
              alt="fireworks"
              src={celebrationGif}
              fill
            />
          </div>
        )
      }
      <section className='grid grid-cols-3 w-fit p-10 rounded-xl mx-auto bg-white gap-4 h-fit'>
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
        <div className="flex justify-center pt-6 relative z-20">
          <p className={`${gameInProgress ? 'hidden' : 'block'} bg-primary text-white py-4 px-6 rounded-xl font-bold`}
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
      </div>
    </>
  )
}
