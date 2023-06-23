import React, { useEffect, useState } from 'react'
import celebrationGif from '../images/icegif-85.gif'
import handShake from '../images/draw1.png'
import sadFace from '../images/sad.png'
import WinnerModal from './winnerModal';

export default function SinglePlayerGame({ player1Name, player2Name, player1Symbol, player2Symbol, isEasy, isHard, isMedium }) {

    const [winnerGotten, setWinnerGotten] = useState(false);
    const [gameInProgress, setGameInProgress] = useState(true);
    const [winner, setWinner] = useState(''); //winner name
    const [computerPlayed, setComputerPlayed] = useState(false);
    const [firstPlayer, setFirstPlayer] = useState(player1Name);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const players = [
        { playerName: player1Name, playerSymbol: player1Symbol },
        { playerName: player2Name, playerSymbol: player2Symbol }
    ]
    const [currentPlayer, setCurrentPlayer] = useState(player1Name)
    const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState(players[0].playerSymbol);

    useEffect(() => {
        //if there is a winner, gameInProgress is set to false
        //all timeout's are cleared (to prevent the computerFunction from completing)
        if (winnerGotten) {
            setGameInProgress(false);
            var highestTimeoutId = setTimeout(";");
            for (var i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
            }
        }
    }, [winnerGotten])

    const endGameFunction = () => {
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
                //adding gold background to the winning rows/cols/diagonals
                direction.classList.add('bg-gold')
            });

            if (computerPlayed === true) {
                //check if the winner symbol is the same as the computer symbol, so as to set the winner
                if (winnerSymbol === player2Symbol) {
                    setCurrentPlayer(player2Name)
                    setWinner(player2Name)
                    setFirstPlayer(player1Name)
                    setPlayer2Score(player2Score + 1)
                } else {
                    setCurrentPlayer(player1Name)
                    setWinner(player1Name);
                    setFirstPlayer(player2Name);
                    setPlayer1Score(player1Score + 1)
                }
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

    // for advanced computer playing
    const isAlmostWin = (directions) => {
        //getting direction passed from the checkIsAlmostWin function
        let directionsTextContents = []
        directions.forEach(direction => {
            directionsTextContents.push(direction.textContent)
        });

        //checking if any of the directions gotten has 2 similar symobol (to either block or win)
        //first check if it is not empty

        if ((directionsTextContents[0] !== '' && directionsTextContents[1] !== '') && directionsTextContents[0] === directionsTextContents[1]) {
            //console.log(directionsTextContents)

            directions.forEach(direction => {
                if (direction.textContent === '') {
                    direction.textContent = player2Symbol
                    direction.classList.add('text-secondary')
                }
                //console.log(direction.textContent)
            })
            return true
        } else if (((directionsTextContents[0] !== '' && directionsTextContents[2] !== '') && directionsTextContents[0] === directionsTextContents[2])) {
            //console.log(directionsTextContents)

            directions.forEach(direction => {
                if (direction.textContent === '') {
                    direction.textContent = player2Symbol
                    direction.classList.add('text-secondary')
                }
                //console.log(direction.textContent)
            })
            return true
        } else if ((directionsTextContents[1] !== '' && directionsTextContents[2] !== '') && directionsTextContents[1] === directionsTextContents[2]) {
            //console.log(directionsTextContents)

            directions.forEach(direction => {
                if (direction.textContent === '') {
                    direction.textContent = player2Symbol
                    direction.classList.add('text-secondary')
                }
                //console.log(direction.textContent)
            })
            return true
        } else {
            return false
        }
    }

    const checkIsAlmostWin = () => {
        //getting all boxes
        const allBoxes = document.querySelectorAll('.allBoxes');
        const allPlayer1Boxes = [];

        //getting all empty box that can be filled randomly (when no winning move)
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

        //getting boxes that contains player 1 symbol and adding it to the allPlayer1Boxes array
        for (let i = 0; i < allBoxes.length; i++) {
            if (allBoxes[i].textContent == player1Symbol) {
                allPlayer1Boxes.push(allBoxes[i]);
            }
        }

        let nextBoxDataAttribute = [];
        const emptyBoxWithSameAttribute = [];

        //getting the data attribute of the boxes containing player 1 symbol
        //and comparing for the boxes with the same attributes
        if (allPlayer1Boxes.length > 1) {
            for (let j = 0; j < allPlayer1Boxes.length; j++) {
                let boxDataAttribute = JSON.parse(allPlayer1Boxes[j].dataset.directions)

                //I started from j+1 so as not to compare an element with itself
                for (let k = j + 1; k < allPlayer1Boxes.length; k++) {
                    nextBoxDataAttribute = JSON.parse(allPlayer1Boxes[k].dataset.directions)

                    for (let l = 0; l < boxDataAttribute.length; l++) {
                        for (let m = 0; m < nextBoxDataAttribute.length; m++) {
                            if (boxDataAttribute[l] === nextBoxDataAttribute[m]) {
                                console.log(boxDataAttribute[l])
                                console.log(nextBoxDataAttribute[m])

                                //I got all elements with the data-direction attribute
                                //got the ones that has the same attribute as the  guys (l,m) above and are also empty
                                //add them to the emtyBoxWithSameAttribute array
                                //and the fill the first element in the array with computer's symbol
                                const boxWithAttribute = document.querySelectorAll(`[data-directions]`)
                                for (let n = 0; n < boxWithAttribute.length; n++) {
                                    if (JSON.parse(boxWithAttribute[n].dataset.directions).includes(boxDataAttribute[l])) {
                                        //console.log(boxWithAttribute[n])
                                        if (boxWithAttribute[n].textContent == '') {
                                            //console.log(boxWithAttribute[n])
                                            emptyBoxWithSameAttribute.push(boxWithAttribute[n])
                                            //console.log(emptyBoxWithSameAttribute)
                                            emptyBoxWithSameAttribute[0].textContent = player2Symbol
                                            emptyBoxWithSameAttribute[0].classList.add('text-secondary')
                                        }
                                    }
                                }
                                //else if there are no winning moves by player 1
                            } else if (boxDataAttribute[l] != nextBoxDataAttribute[m]) {
                               console.log('no way')
                            }
                        }
                    }
                }
            }
            //else if only one box is filled (i.e player 1 has played only once)
        } else {
            const randomBox = allEmptyBoxesIndex[Math.floor(Math.random() * allEmptyBoxesIndex.length)];
            //console.log(randomBox)
            if (randomBox != undefined) {
                allBoxes[randomBox].textContent = player2Symbol
                allBoxes[randomBox].classList.add('text-secondary')
            }
        }
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

        if (isEasy) {
            const randomBox = allEmptyBoxesIndex[Math.floor(Math.random() * allEmptyBoxesIndex.length)];
            //console.log(randomBox)
            players.forEach(player => {
                setCurrentPlayer(player.playerName)
                setCurrentPlayerSymbol(player.playerSymbol)
            });

            if (gameInProgress === true) {
                setTimeout(() => {
                    if (randomBox != undefined) {
                        allBoxes[randomBox].textContent = player2Symbol
                        allBoxes[randomBox].classList.add('text-secondary')

                        setCurrentPlayer(players[0].playerName);
                        setCurrentPlayerSymbol(players[0].playerSymbol);
                        setFirstPlayer(player1Name);
                        endGameFunction();
                        setComputerPlayed(true)
                    }
                    chooseWinner();
                }, 400);
            }
        }

        if (isMedium) {
            players.forEach(player => {
                setCurrentPlayer(player.playerName)
                setCurrentPlayerSymbol(player.playerSymbol)
            });

            if (gameInProgress === true) {
                setTimeout(() => {
                    checkIsAlmostWin();

                    setCurrentPlayer(players[0].playerName);
                    setCurrentPlayerSymbol(players[0].playerSymbol);
                    setFirstPlayer(player1Name);
                    endGameFunction();
                    setComputerPlayed(true)

                    chooseWinner();
                }, 400);
            }
        }

        setComputerPlayed(false);
        chooseWinner();
    }

    const setPlayerFunction = (e) => {
        //console.log(e.target.textContent)
        if (gameInProgress === true) {
            if (e.target.textContent === '') {
                e.target.textContent = currentPlayerSymbol
                if (currentPlayer === player1Name) {
                    e.target.classList.add('text-primary')
                }

                setFirstPlayer(player2Name);
                computerPlayer();
            }
            endGameFunction();
            chooseWinner();
        }
    }

    const playAgainFunction = () => {
        const allBoxes = document.querySelectorAll('.allBoxes');
        allBoxes.forEach(box => {
            box.textContent = ''

            if (box.classList.contains('bg-gold') || box.classList.contains('text-primary') || box.classList.contains('text-secondary')) {
                box.classList.remove('bg-gold')
                box.classList.remove('text-primary');
                box.classList.remove('text-secondary')
            }
        });

        setCurrentPlayer(player1Name)
        setCurrentPlayerSymbol(player1Symbol)
        setGameInProgress(true);
        setWinnerGotten(false);
        setWinner('');

        if (firstPlayer != 'You') {
            //get box between 0 - 8
            let randomBox = Math.floor((Math.random() * 9))
            allBoxes[randomBox].textContent = player2Symbol
            allBoxes[randomBox].classList.add('text-secondary')
            setCurrentPlayerSymbol(player1Symbol)
        }
    }

    return (
        <>
            {/* player info section */}
            <div className='flex items-center justify-around h-full mb-20'>

                <div className='flex flex-col items-center'>
                    {
                        gameInProgress && (
                            <p className={`text-gold md:text-base text-sm mb-2 ${currentPlayer === player1Name ? 'visible' : 'invisible'}`}>Your turn</p>
                        )
                    }
                    <div className='bg-lightSecondary rounded-2xl p-2 pt-4 ring-inset ring ring-gold'>
                        <p className='md:text-base text-sm font-bold mb-3 text-center'>{player1Name}</p>
                        <div className='bg-blackPurple rounded-2xl flex justify-center p-4'>
                            <p className='playing-text text-primary font-bold text-6xl text-center [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)]'>{player1Symbol}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-start justify-between lg:text-2xl md:text-xl text-lg text-white'>
                    <p className='mr-4'>{player1Score}</p>
                    <p className='mr-4'>:</p>
                    <p>{player2Score}</p>
                </div>

                <div className='flex flex-col items-center'>
                    {
                        gameInProgress && (
                            <p className={`text-gold md:text-base text-sm mb-2 ${currentPlayer === player2Name ? 'visible' : 'invisible'}`}>Your turn</p>
                        )
                    }
                    <div className='bg-lightSecondary rounded-2xl p-2 pt-4 ring-inset ring ring-gold'>
                        <p className='md:text-base text-sm font-bold mb-3 text-center'>{player2Name}</p>
                        <div className='bg-blackPurple rounded-2xl flex justify-center p-4'>
                            <p className='playing-text text-secondary font-bold text-6xl text-center [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)]'>{player2Symbol}</p>
                        </div>
                    </div>
                </div>

            </div>

            {
                winnerGotten && (
                    <div className='absolute h-full w-full bg-black/[.3] z-40 top-0 bottom-0 flex flex-col justify-center px-12' id='winnerModal'>
                        <WinnerModal isWinner={winnerGotten} name={winner} wonOrLost={'won'} imageSrc={celebrationGif} playAgainButtonClick={playAgainFunction} />
                    </div>
                )
            }

            {
                (winnerGotten && winner === player2Name) && (
                    <div className='absolute h-full w-full bg-black/[.3] z-40 top-0 bottom-0 flex flex-col justify-center px-12' id='winnerModal'>
                        <WinnerModal isWinner={winnerGotten} name={player1Name} wonOrLost={'lost'} imageSrc={sadFace} playAgainButtonClick={playAgainFunction} />
                    </div>
                )
            }

            {
                (!winnerGotten && !gameInProgress) && (
                    <div className='absolute h-full w-full bg-black/[.3] z-40 top-0 bottom-0 flex flex-col justify-center px-12' id='winnerModal'>
                        <WinnerModal isWinner={winnerGotten} name={''} wonOrLost={'Draw'} imageSrc={handShake} playAgainButtonClick={playAgainFunction} />
                    </div>
                )
            }

            <section className='grid grid-cols-3 sm:w-fit w-11/12 sm:p-10 p-4 rounded-xl mx-auto bg-lightSecondary sm:gap-4 gap-2 h-fit'>
                <div className={`allBoxes playing-text horizontalTopBox diagonal1Box verticalLeftBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalTopBox", "diagonal1Box", "verticalLeftBox"]'
                ></div>
                <div className={`allBoxes playing-text horizontalTopBox verticalMiddleBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalTopBox", "verticalMiddleBox"]'
                ></div>
                <div className={`allBoxes playing-text horizontalTopBox verticalRightBox diagonal2Box bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalTopBox", "verticalRightBox", "diagonal2Box"]'
                ></div>
                <div className={`allBoxes playing-text horizontalMiddleBox verticalLeftBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalMiddleBox", "verticalLeftBox"]'
                ></div>
                <div className={`allBoxes playing-text horizontalMiddleBox diagonal1Box diagonal2Box verticalMiddleBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalMiddleBox", "diagonal1Box", "diagonal2Box"]'
                ></div>
                <div className={`allBoxes playing-text horizontalMiddleBox verticalRightBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalMiddleBox", "verticalRightBox"]'
                ></div>
                <div className={`allBoxes playing-text horizontalBottomBox verticalLeftBox diagonal2Box bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalBottomBox", "verticalLeftBox", "diagonal2Box"]'
                ></div>
                <div className={`allBoxes playing-text horizontalBottomBox verticalMiddleBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalBottomBox", "verticalMiddleBox"]'
                ></div>
                <div className={`allBoxes playing-text horizontalBottomBox diagonal1Box verticalRightBox bg-blackPurple [text-shadow:_0_8px_0_rgb(0_0_0_/_60%)] p-4 rounded-xl sm:text-8xl text-6xl text-center sm:w-36 w-auto sm:h-36 h-24`}
                    onClick={(e) => { setPlayerFunction(e) }} data-directions='["horizontalBottomBox", "verticalRightBox", "diagonal1Box"]'
                ></div>
            </section>
        </>
    )
}
