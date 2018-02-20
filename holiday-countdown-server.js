const express = require('express'),
      path = require('path'),
      app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.listen(8080, () => console.log('Server started on port 8080'))