import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import celebrationGif from '../images/icegif-85.gif'
import thinkingGif from '../images/thinking.gif'

export default function Game({ player1Name, player2Name, player1Symbol, player2Symbol, isSinglePlayer, singlePlayerTag }) {

  const [winnerGotten, setWinnerGotten] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [winner, setWinner] = useState(''); //winner name
  const [computerPlayed, setComputerPlayed] = useState(false);
  const [playerTag, setplayerTag] = useState(singlePlayerTag);

  const players = [
    { playerName: player1Name, playerSymbol: player1Symbol },
    { playerName: player2Name, playerSymbol: player2Symbol }
  ]
  const [currentPlayer, setCurrentPlayer] = useState(player1Name)
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState(players[0].playerSymbol);


  useEffect(() => {
    if (isSinglePlayer) {
      //call the chooseWinner function to check always if anyone has one
      chooseWinner();

      //if there is a winner, gameInProgress is set to false
      //all timeout's are cleared (to prevent the computerFunction from completing)
      if (winnerGotten) {
        setGameInProgress(false);
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
    //check if all the boxes have been filled so as to end the game
    if (textContents.every((textContent) => textContent != '')) {
      setGameInProgress(false)
    }
  }

  const isWinner = (directions) => {
    let directionsTextContents = []
    directions.forEach(direction => {
      directionsTextContents.push(direction.textContent)
    });

    if (directionsTextContents.every((textContent) => textContent === 'X') || directionsTextContents.every((textContent) => textContent === 'O')) {
      setWinnerGotten(true);
      setGameInProgress(false);
      const winnerSymbol = directionsTextContents[0]

      //console.log(directions)
      directions.forEach(direction => {
        //console.log(direction.classList)
        //adding the red color to the winning 3's
        direction.classList.add('text-red-500')
      });

      if (computerPlayed === true) {
        //check if the winner symbol is the same as the computer symbol, so as to set the winner
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
    setplayerTag("Computer's")
    if (gameInProgress === true) {
      setTimeout(() => {
        if (randomBox != undefined) {
          
          allBoxes[randomBox].textContent = player2Symbol

          setplayerTag(singlePlayerTag)
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
          if (currentPlayer === 'You') {
            setplayerTag(singlePlayerTag)
          } 

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
            <div className='flex justify-center'>
              {
                isSinglePlayer && (
                  <p className={`${winnerGotten ? 'hidden' : 'block'} mr-4 text-primary font-bold lg:text-3xl sm:text-2xl text-xl capitalize text-center md:mb-6 mb-3`}>
                    {playerTag} turn
                  </p>
                )
              }

              {
                isSinglePlayer && (
                  <div className={`relative h-12 w-12 ${currentPlayer === player2Name ? 'block' : 'hidden'} `}>
                    <Image
                      className="object-scale-down absolute w-full h-full"
                      alt="thinking"
                      src={thinkingGif}
                      fill
                    />
                  </div>
                )
              }

            </div>
          )
        }
        <p className={`${gameInProgress ? 'hidden' : 'block'} text-primary font-bold lg:text-3xl sm:text-2xl text-xl capitalize text-center mb-6`}>Game over</p>
        {
          winnerGotten && (
            <p className='text-center text-primary lg:text-3xl sm:text-2xl text-xl uppercase font-extrabold'>{winner} won!!!</p>
          )
        }
      </div>

      {
        winnerGotten && (
          <div className='absolute z-10 w-full h-72 top-20'>
            <Image
              className="object-scale-down absolute w-full h-full"
              alt="fireworks"
              src={celebrationGif}
              fill
            />
          </div>
        )
      }
      <section className='grid grid-cols-3 sm:w-fit w-11/12 sm:p-10 p-4 rounded-xl mx-auto bg-white sm:gap-4 gap-2 h-fit'>
        <div className='allBoxes horizontalTopBox diagonal1Box verticalLeftBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalTopBox verticalMiddleBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalTopBox verticalRightBox diagonal2Box bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox verticalLeftBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox diagonal1Box diagonal2Box verticalMiddleBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalMiddleBox verticalRightBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox verticalLeftBox diagonal2Box bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox verticalMiddleBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
        <div className='allBoxes horizontalBottomBox diagonal1Box verticalRightBox bg-black p-4 rounded-xl sm:text-8xl text-6xl text-white text-center sm:w-36 w-auto sm:h-36 h-24'
          onClick={(e) => { setPlayerFunction(e) }}
        ></div>
      </section>

      <div>
        <div className="flex justify-center pt-6 relative z-20">
          <p className={`${gameInProgress ? 'hidden' : 'block'} bg-primary text-white md:py-4 py-2 px-6 rounded-xl font-bold`}
            onClick={() => {
              const allBoxes = document.querySelectorAll('.allBoxes');
              allBoxes.forEach(box => {
                box.textContent = ''

                if (box.classList.contains('text-red-500')) {
                  box.classList.remove('text-red-500')
                }
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
