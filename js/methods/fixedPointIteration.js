import { sameAccuracy } from '../utilities'

export default (f, x0, accuracy) => {
  const table = [
    {
      r: 0,
      x_r: x0
    }
  ]

  for (let i = 0; i < 50; i += 1) {
    const lastRow = table[table.length - 1]

    if (sameAccuracy(table, accuracy, 'x_r')) {
      break
    }

    table.push({
      r: table.length,
      x_r: f({ x: lastRow.x_r })
    })
  }

  return table
}
