import { mapObjectValues, sameAccuracy } from '../utilities'

export default (f, x0, x1, accuracy) => {
  const table = [
    {
      x_r: x0,
      'x_{r + 1}': x1,
      'x_{r + 2}': 0
    }
  ]

  for (let i = 0; i < 50; i += 1) {
    const lastRow = table[table.length - 1]

    const fLastRow = mapObjectValues(lastRow, (x) => f({ x }))

    lastRow['x_{r + 2}'] =
      (lastRow.x_r * fLastRow['x_{r + 1}'] -
        lastRow['x_{r + 1}'] * fLastRow.x_r) /
      (fLastRow['x_{r + 1}'] - fLastRow.x_r)

    if (sameAccuracy(table, accuracy, 'x_{r + 2}')) {
      break
    }

    table.push({
      x_r: lastRow['x_{r + 1}'],
      'x_{r + 1}': lastRow['x_{r + 2}'],
      'x_{r + 2}': 0
    })
  }

  return table
}
