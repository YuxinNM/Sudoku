// JavaScript program to generate a valid sudoku 
// with k empty cells

// Returns false if given 3x3 block contains num
// Ensure the number is not used in the box
function unUsedInBox(grid, rowStart, colStart, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[rowStart + i][colStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Fill a 3x3 matrix
// Assign valid random numbers to the 3x3 subgrid
function fillBox(grid, row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                // Generate a random number between 1 and 9
                num = Math.floor(Math.random() * 9) + 1;
            } while (!unUsedInBox(grid, row, col, num));
            grid[row + i][col + j] = num;
        }
    }
}

// Check if it's safe to put num in row i
// Ensure num is not already used in the row
function unUsedInRow(grid, i, num) {
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in column j
// Ensure num is not already used in the column
function unUsedInCol(grid, j, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in the cell (i, j)
// Ensure num is not used in row, column, or box
function checkIfSafe(grid, i, j, num) {
    return unUsedInRow(grid, i, num) && unUsedInCol(grid, j, num) &&
           unUsedInBox(grid, i - (i % 3), j - (j % 3), num);
}

// Fill the diagonal 3x3 matrices
// The diagonal blocks are filled to simplify the process
function fillDiagonal(grid) {
    
    for (let i = 0; i < 9; i += 3) {
        
        // Fill each 3x3 subgrid diagonally
        fillBox(grid, i, i);
    }
}

// Fill remaining blocks in the grid
// Recursively fill the remaining cells with valid numbers
function fillRemaining(grid, i, j) {
    
    // If we've reached the end of the grid
    if (i === 9) {
        return true;
    }

    // Move to next row when current row is finished
    if (j === 9) {
        return fillRemaining(grid, i + 1, 0);
    }

    // Skip if cell is already filled
    if (grid[i][j] !== 0) {
        return fillRemaining(grid, i, j + 1);
    }

    // Try numbers 1-9 in current cell
    for (let num = 1; num <= 9; num++) {
        if (checkIfSafe(grid, i, j, num)) {
            grid[i][j] = num;
            if (fillRemaining(grid, i, j + 1)) {
                return true;
            }
            grid[i][j] = 0;
        }
    }

    return false;
}

// Remove K digits randomly from the grid
// This will create a Sudoku puzzle by removing digits
function removeKDigits(grid, k) {
    while (k > 0) {
        
        // Pick a random cell
        let cellId = Math.floor(Math.random() * 81);

        // Get the row index
        let i = Math.floor(cellId / 9);

        // Get the column index
        let j = cellId % 9;

        // Remove the digit if the cell is not already empty
        if (grid[i][j] !== 0) {
            // Empty the cell
            grid[i][j] = 0;

            // Decrease the count of digits to remove
            k--;
        }
    }
}

// Generate a Sudoku grid with K empty cells
function sudokuGenerator(k) {
    
    // Initialize an empty 9x9 grid
    let grid = new Array(9).fill(0).map(() => new Array(9).fill(0));

    // Fill the diagonal 3x3 matrices
    fillDiagonal(grid);

    // Fill the remaining blocks in the grid
    fillRemaining(grid, 0, 0);


    const solution = grid.map(row => row.slice());

    removeKDigits(grid, k);
    const board = grid.map(row => row.slice())

    return { board, solution };
}

module.exports = { sudokuGenerator };


