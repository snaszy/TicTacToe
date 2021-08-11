const gameModule = (function () {
    let gameBoard = [];

    const gameContainer = document.querySelector('[data-container]');
    const informationWindow = document.querySelector('[data-info-window]');
    const resetButton = document.querySelector('[data-reset]');

    const Player = (sign, turn) => {
        const getSign = () => sign;
        const getTurn = () => turn;
        return {sign, turn}
    };

    let playerOne = Player('x', true);
    let playerTwo = Player('o', false);

    let count = 0;

    let gameOver = false;
    let tieGame = false;

    displayGame = () => {
        
        gameContainer.querySelectorAll('[data-box]').forEach(box => box.remove())
        for (let i = 0; i < 9; i++) {
            const game = document.createElement('button');
            game.setAttribute('data-box', '');
            game.textContent = gameBoard[i];
            gameContainer.appendChild(game);
        
            game.addEventListener('click', () => {
                count += 1
                if (gameOver) {
                    return;
                } else if (gameBoard[i] === 'x' || gameBoard[i] === 'o') {
                    return;
                } else if (count % 2 === 1) {
                    gameBoard[i] = playerOne.sign;
                } else {
                    gameBoard[i] = playerTwo.sign;
                }
                displayGame();
                checkGame();
            })
        }
    };

    checkGame = () => {
        let currentPlayer = playerOne.turn ? playerOne : playerTwo;

        const winningArray = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6], 
        ];

        winningArray.forEach(array => {
            if(gameBoard[array[0]] === currentPlayer.sign && gameBoard[array[1]] === currentPlayer.sign && gameBoard[array[2]] === currentPlayer.sign) {
                informationWindow.textContent=`${currentPlayer.sign} wins`;
                gameOver = true;
            } else if (count === 9 && gameOver === false){
                informationWindow.textContent=`tie`;
            }
        });

        if (count % 2 === 1) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        } 
    }

    resetGame = () => {
        gameBoard = ['','','','','','','','',''];
        gameOver = false;
        playerOne.turn = true;
        playerTwo.turn = false;
    }

    displayGame()

    resetButton.addEventListener('click', () => {
        resetGame();
        displayGame();
    })
})();