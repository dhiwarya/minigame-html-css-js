import { TILE_STATUSES, drawBoard, markTile, revealTile, checkWin, checkLose } from './logic.js'

const DIFFICULTIES = {
    easy: { width: 8, height: 8, mines: 10 },
    medium: { width: 9, height: 9, mines: 10 },
    hard: { width: 10, height: 10, mines: 10 },
    expert: { width: 13, height: 15, mines: 40 },
};

const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.title')
const difficultySelect = document.querySelector('#difficulty')
const newGameBtn = document.querySelector('#new-game-btn')

function startGame(difficulty) {
    boardElement.removeEventListener('click', stopProp, { capture: true })
    boardElement.removeEventListener('contextmenu', stopProp, { capture: true })

    const { width, height, mines } = DIFFICULTIES[difficulty]

    let board = drawBoard(width, height, mines)
    boardElement.innerHTML = ''
    messageText.textContent = 'Minesweeper'

    boardElement.style.setProperty('--width', width)
    boardElement.style.setProperty('--height', height)
    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)
            tile.element.addEventListener('click', () => {
                revealTile(board, tile)
                checkGameEnd(board, mines)
            })
            tile.element.addEventListener('contextmenu', e => {
                e.preventDefault()
                markTile(tile)
                listMinesLeft(board, mines)
            })
        })
    })
    listMinesLeft(board, mines)
}

function listMinesLeft(board, numberOfMines) {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    minesLeftText.textContent = numberOfMines - markedTilesCount
}

function checkGameEnd(board, numberOfMines) {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = 'You Win'
    }
    if (lose) {
        messageText.textContent = 'You Lose'
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}

newGameBtn.addEventListener('click', () => {
    const difficulty = difficultySelect.value
    startGame(difficulty)
})

startGame('easy')
