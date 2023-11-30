const express = require('express')
const webserver = express()
 .listen(3000, () => console.log(`Listening on ${3000}`))
const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 8000 })

sockserver.on('connection', ws => {
  ws.send('connection successed')

  ws.on('close', () => 
    console.log('Client has disconnected!')
  )

  ws.on('message', data => {
    sockserver.clients.forEach(client => {
       var asdf = JSON.parse(data);
       client.send(`${asdf.message}`)
    })
  })

  ws.onerror = function () {
     console.log('websocket error')
  }
})
