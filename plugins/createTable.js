import { renderToString } from 'katex'

import calculators from '~/js/calculators'
import methods from '~/js/methods'

// Outputs either a column's titles or a list of it and f of it if it has addF
const generateColumnTitle = (column) => {
  if (column.addF) {
    return [column.name, `f(${column.name})`]
  }

  return column.name
}

const createTable = (calculatorKey, f, parameters) => {
  const { columns, addR } = calculators[calculatorKey]
  const method = methods[calculatorKey]

  // Generates x with f(x) as well if addF is true
  const addF = ([key, x]) => {
    const column = columns.find((element) => element.name === key)
    if (column) {
      if (column.addF) {
        return `${x} & ${f({ x })}`
      }
    }
    return x
  }

  // Generates the text for a row of a table
  const makeRow = (row, i) => {
    let start = ''
    if (addR) {
      start = `${i} &`
    }

    return `${start} ${Object.entries(row)
      .map(addF)
      .join(' & ')} \\\\ \\hline`
  }

  const columnTitles = columns.flatMap(generateColumnTitle)
  if (addR) {
    columnTitles.unshift('r')
  }

  const table = method(f, ...parameters)

  const cSet = `|${Array(Object.values(table[0]).length * 2)
    .fill('c|')
    .join('')}`

  const tableRows = table.map(makeRow).join(' ')

  const array = `
    \\begin{array}{${cSet}} \\hline
    ${columnTitles.join(' & ')} \\\\ \\hline
    ${tableRows}
    \\end{array}`

  return renderToString(array, {
    displayMode: true
  })
}

export default ({ app }, inject) => {
  inject('createTable', createTable)
}
