import { sameAccuracy, straddle } from '../utilities'

export default (f, a, b, accuracy) => {
  const table = [
    {
      a,
      b,
      c: null
    }
  ]

  while (true) {
    const lastRow = table[table.length - 1]
    lastRow.c = (lastRow.a + lastRow.b) / 2

    if (sameAccuracy(table, accuracy, 'c')) {
      break
    }

    if (straddle(table, f)) {
      break
    }
  }

  return table
}
