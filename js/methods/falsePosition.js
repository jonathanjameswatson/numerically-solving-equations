import { mapObjectValues, sameAccuracy, straddle } from '../utilities'

export default (f, a, b, accuracy) => {
  const table = [
    {
      a,
      b,
      c: 0
    }
  ]

  for (let i = 0; i < 50; i += 1) {
    const lastRow = table[table.length - 1]

    const fLastRow = mapObjectValues(lastRow, (x) => f({ x }))

    lastRow.c =
      (lastRow.a * fLastRow.b - lastRow.b * fLastRow.a) /
      (fLastRow.b - fLastRow.a)

    if (sameAccuracy(table, accuracy, 'c')) {
      break
    }

    if (straddle(table, f)) {
      break
    }
  }

  return table
}
