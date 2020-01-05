export const mapObjectValues = (object, f) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, f(value)])
  )

export const roundToDp = (number, dp) =>
  +(Math.round(number + `e+${dp}`) + `e-${dp}`)

export const straddle = (table, f) => {
  const lastRow = table[table.length - 1]
  const { a, b, c } = mapObjectValues(lastRow, (x) => Math.sign(f({ x })))

  if (c === a) {
    table.push({
      a: lastRow.c,
      b: lastRow.b,
      c: 0
    })
  } else if (c === b) {
    table.push({
      a: lastRow.a,
      b: lastRow.c,
      c: 0
    })
  } else {
    return true
  }
}

export const sameAccuracy = (table, accuracy, key) => {
  if (table.length < 2) {
    return false
  }

  return (
    roundToDp(table[table.length - 1][key], accuracy) ===
    roundToDp(table[table.length - 2][key], accuracy)
  )
}
