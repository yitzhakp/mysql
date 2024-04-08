const { con } = require('./model')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

con.connect(function (err) {
  if (err) console.error(err)
  console.log('Connected!')
})

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  try {
    con.query('SELECT * FROM customers', function (err, result, fields) {
      if (err) console.error(err)
      console.log(result)
      response.json(result)
    })
  } catch {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const ids = Number(request.params.id)
  const sql = `DELETE FROM customers WHERE id = ${ids}`
  console.log(sql)
  con.query(sql, function (err, result) {
    if (err) throw err
    console.log('Number of records deleted: ' + result.affectedRows)
    response.status(204).end()
  })
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.name || !note.address) {
    return response.status(400).json({
      error: 'note.content is void'
    })
  }

  const sql = `INSERT INTO customers (name, address) VALUES ("${note.name}", "${note.address}")`
  con.query(sql, function (err, result) {
    if (err) console.error(err)
    console.log('1 record inserted')
    response.status(201).json()
  })
})

app.put('/api/notes/:id', (request, response) => {
  const note = request.body
  const ids = Number(request.params.id)
  if (!note || !note.address) {
    return response.status(400).json({
      error: 'note.content is void'
    })
  }

  const sql = `UPDATE customers SET address = '${note.address}' WHERE id = ${ids}`

  con.query(sql, function (err, result) {
    if (err) console.error(err)
    console.log(result.affectedRows + ' record(s) updated')
    response.status(201)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
