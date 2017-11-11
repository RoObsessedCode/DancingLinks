
const nDim = require('multi-dim')

class ConstraintMatrix {

  constructor(symbolQuantity) {
    this.rows = Math.pow(symbolQuantity, 3)
    this.cols = 3 * Math.pow(symbolQuantity, 2)

    this.symbolQuantity = symbolQuantity
    this.numDims = 2

    this.matrix = nDim.construct([this.rows, this.cols])
    this.fillConstraints()

    console.log(this.matrix)

  }

  //constraints
  symbolValue(constraintIndex) {
    return Math.floor(constraintIndex / (this.symbolQuantity * this.numDims)) + 1
  }

  //col OR row
  constraintValue(constraintIndex) {
    return (constraintIndex % this.symbolQuantity)
  }

  isRow(constraintIndex) {
    return Math.floor(constraintIndex / this.symbolQuantity) % this.numDims
  }

  //possibility space of rows: LETS GO
  symbolValuePossibility(possibilityIndex) {
    return Math.floor(possibilityIndex / Math.pow(this.symbolQuantity, 2)) + 1
  }

  rowPosition(possibilityIndex) {
    return Math.floor(possibilityIndex / this.symbolQuantity) % this.symbolQuantity
  }

  colPosition(possibilityIndex) {
    return possibilityIndex % this.symbolQuantity
  }

  fillConstraints() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.symbolValue(i) === this.symbolValuePossibility(j)) {
          if (this.isRow(j) && this.constraintValue(j) === this.rowPosition(i))
            this.matrix[i][j] = 1
          if (!this.isRow(j) && this.constraintValue(j) === this.colPosition(i))
            this.matrix[i][j] = 1
        }
      }
    }
  }

}

new ConstraintMatrix(3)
