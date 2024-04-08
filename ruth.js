const axios = require('axios')

axios.get('https://siichile.herokuapp.com/consulta', {
  params: {
    rut: '76118195-5'
  }
})
  .then((response) => {
    console.log(response)
  })
