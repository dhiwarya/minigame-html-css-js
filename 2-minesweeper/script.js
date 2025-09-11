import { TILE_STATUSES, drawBoard, markTile } from './logic.js'

// 1.) Setting up board
const BOARD_SIZE = 8
const NUMBER_OF_MINES = 6
const minesLeftText = document.querySelector('[data-mine-count]')

const board = drawBoard(BOARD_SIZE, NUMBER_OF_MINES)
console.log(board)
const boardElement = document.querySelector('.board')
boardElement.style.setProperty('--size', BOARD_SIZE)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {

        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}