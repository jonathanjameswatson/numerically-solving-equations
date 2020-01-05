import { mapObjectValues, sameAccuracy, straddle } from '../utilities'

export default (f, a, b, accuracy) => {
  const table = [
    {
      a,
      b,
      c: 0
    }
  ]

  while (true) {
    const lastRow = table[table.length - 1]

    const fLastRow = mapObjectValues(lastRow, (x) => f({ x }))

    lastRow.c =
      (lastRow.a * fLastRow.b - lastRow.b * fLastRow.a) /
      (fLastRow.b - fLastRow.a)
    fLastRow.c = f({ x: lastRow.c })

    if (sameAccuracy(table, accuracy, 'c')) {
      break
    }

    if (straddle(table, f)) {
      break
    }
  }

  return table
}
