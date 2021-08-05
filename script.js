let gameBoard = [];

const gameContainer = document.querySelector('[data-container]');

let type = '';

playGame = () => {
    if (type === 'x' || type === '') {
        type = 'o';
    } else {
        type = 'x';
    }
}

displayGame = () => {
    gameContainer.querySelectorAll('[data-box]').forEach(box => box.remove())
    for (let i = 0; i < 9; i++) {
        const game = document.createElement('button');
        game.setAttribute('data-box', '');
        game.textContent = gameBoard[i];
        gameContainer.appendChild(game);
    
        game.addEventListener('click', () => {
            playGame()
            if (gameBoard[i] === 'x' || gameBoard[i] === 'o') {
                return;
            } else {
                gameBoard[i] = type;
            }
            displayGame()
        })
    }
};

displayGame()

function displayController() {

}

function players() {

}
