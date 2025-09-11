export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}

export function drawBoard(width, height, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(width, height, numberOfMines)

    for (let x = 0; x < width; x++) {
        const row = []
        for (let y = 0; y < height; y++) {
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUSES.HIDDEN
            const tile = {
                element, 
                x, 
                y,
                mine: minePositions.some(positionMatch.bind(null, {x, y})),
                get status() {
                    return this.element.dataset.status
                },
                set status(value) {
                    return element.dataset.status = value
                }
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}

function getMinePositions(width, height, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(width),
            y: randomNumber(height)
        }
        if (!positions.some(p => positionMatch(p, position))) {
            positions.push(position)
        }
    }
    return positions
}

function positionMatch(a, b) {
    return a.x == b.x && a.y == b.y
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

export function markTile(tile) {
    if (
        tile.status !== TILE_STATUSES.HIDDEN && 
        tile.status !== TILE_STATUSES.MARKED
    ) {
        return 
    }
    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN 
    } else {
        tile.status = TILE_STATUSES.MARKED
    }
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return
    }

    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE
        return
    }

    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(board, tile)
    const mines = adjacentTiles.filter(t => t.mine)
    if (mines.length === 0) {
        adjacentTiles.forEach(revealTile.bind(null, board))
    } else {
        tile.element.textContent = mines.length
    }
}

function nearbyTiles(board, { x, y }) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const newX = x + xOffset
            const newY = y + yOffset
            if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
                const tile = board[newX][newY]
                if(tile) tiles.push(tile)
            }
        }
    }

    return tiles
}

export function checkWin(board) {
    return board.every(row => {
      return row.every(tile => {
        return (
          tile.status === TILE_STATUSES.NUMBER ||
          (tile.mine &&
            (tile.status === TILE_STATUSES.HIDDEN ||
              tile.status === TILE_STATUSES.MARKED))
        )
      })
    })
}
  
export function checkLose(board) {
    return board.some(row => {
      return row.some(tile => {
        return tile.status === TILE_STATUSES.MINE
      })
    })
}