//DANCING LINKS ALGORITHM

const matrix = [

    [1,0,0,0,1,1,0],
    [1,1,0,0,0,1,0],
    [1,1,1,0,1,1,0],
    [0,0,1,0,1,0,0],
    [0,1,0,0,0,1,1],
    [1,0,0,1,0,1,1]

  ]

  const node = function() {
    return {
      right: null,
      left: null,
      up: null,
      down: null
    };
  }

  const quadLinkedList = function(x, y, dir) {

    const dimXLength = x;
    const dimYLength = y;
   // console.log(dimYLength, dimXLength)
    let firstOneIndimX
    let dirA, dirB, value
    for (let dimX = 0; dimX < dimXLength; dimX++) {
      let prevNode
      for (let dimY = 0; dimY < dimYLength; dimY++) {
        //if truthy go left and right
        if (!dir) {
          dirA = "up"
          dirB = "down"
          value = matrix[dimY][dimX];

        } else {
          dirA = "left"
          dirB = "right"
          value = matrix[dimX][dimY]
        }

        /* think about what happens */

       // console.log(dimX, dimY)

        if (value) {
          let newNode = node()
          if (value === 1) matrix[dimX][dimY] = newNode
          else newNode = value
          if (!firstOneIndimX) {
            firstOneIndimX = newNode
            prevNode = newNode
          } else {
            newNode[dirA] = prevNode
            prevNode[dirB] = newNode
          }
          prevNode = newNode
        }

      }
      prevNode[dirB] = firstOneIndimX
      firstOneIndimX[dirA] = prevNode

      firstOneIndimX = null
    }
    //return matrix[0]

  }

  quadLinkedList(matrix.length, matrix[0].length, true)
  quadLinkedList(matrix[0].length, matrix.length, false)

  //left & right
  console.log(matrix[0][0].right.right.right === matrix[0][0])
  console.log(matrix[5][0].right.right.right.right === matrix[5][0])
  console.log(matrix[5][0].right.right === matrix[5][5])

  //up down
  console.log(matrix[0][0].down === matrix[1][0])
  console.log(matrix[0][0].down.down.down.down === matrix[0][0])
  console.log(matrix[1][5].up.up.up.up.up === matrix[1][5])
  console.log(matrix[1][5].up.up.up === matrix[4][5])

  function cover (col) {
    col.left.right = col.right
    col.right.left = col.left;

    let colRunner = col.down

    while (colRunner !== col) {
      let rowRunner = colRunner.right
      while (rowRunner != colRunner) {

        rowRunner.up.down = rowRunner.down
        rowRunner.down.up = rowRunner.up

        rowRunner = rowRunner.right
      }
      colRunner = colRunner.down
    }

  }

  function unCover ( col ) {

    col.right.left = col
    col.left.right = col

    let colRunner = col.up

    while (colRunner !== col) {
      let rowRunner = colRunner.left
      while (rowRunner !== colRunner) {
        rowRunner.down.up = rowRunner
        rowRunner.up.down = rowRunner

        rowRunner = rowRunner.left
      }
      colRunner = colRunner.up
    }

  }

  //search for rows that cover the column exactly
  function search(master, solution=[]) {
    if (master.right === master) {
      return
    }

    const col = master.right
    cover(col)

    let colRunner = col.down

    while (colRunner !== col) {

      let rowRunner = colRunner.right
      solution.push(rowRunner)
      while (rowRunner !== colRunner) {
        cover(rowRunner.col)
        rowRunner = rowRunner.right
      }
      search(master, solution)
      rowRunner = solution.pop().left
      while (rowRunner !== colRunner) {
        unCover(rowRunner.col)
        rowRunner = rowRunner.left
      }
      colRunner = colRunner.down
    }
    unCover(col)
  }
