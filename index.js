const sequelize = require('./model').sequelize
const { Notas } = require('./model')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

sequelize.authenticate()
  .then(() => {
    console.log('Conectados')
  })
  .catch(error => {
    console.log('Erorr es: ' + error)
  })

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  try {
    Notas.findAll()
      .then((getNotas) => {
        const notes = getNotas.map(note => note.dataValues)
        console.log(notes)
        response.json(notes)
      })
  } catch {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const ids = Number(request.params.id)
  Notas.destroy({
    where: {
      id: ids
    }
  })
    .then((delNota) => {
      console.log(delNota)
      response.status(204).end()
    })
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is void'
    })
  }

  const newNote = {
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  Notas.create(newNote)
    .then(() => {
      response.status(201).json(newNote)
    })
})

app.put('/api/notes/:id', (request, response) => {
  const note = request.body
  const ids = Number(request.params.id)
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is void'
    })
  }

  const newNote = {
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  Notas.update(newNote, {
    where: {
      id: ids
    }
  })
    .then(() => {
      response.status(201).json(newNote)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
