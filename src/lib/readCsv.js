
const getCsvData = async () => {
    const file = await fetch("/Electric_Vehicle_Population_Data.csv")
    console.log("Fiel loaded")
    const data = (await file.text()).split(/\r\n|\n|\r/)
    console.log({ConveredFile: data})
    let [columns, ...rows] = data.map((row) => row.split(","))
    console.log({columns, rows})
    const uniqueValues = columns.reduce((acc, col, colIndex) => {
        acc[col] = new Set(rows.map(row => row[colIndex]).filter(Boolean))
        return acc
    }, {})

    console.log({uniqueValues})

    rows = rows.map(row => columns.reduce((f, v, i) => {
        f[v] = row[i]
        return f
    }, {}))
    console.log({rows})
    return {rows, columns, uniqueValues}
}

export default getCsvData