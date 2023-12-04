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
    var json = JSON.parse(data);
    sockserver.clients.forEach(client => {
       if (json.message == undefined) {
        client.send(`${json}`)
       } else {
        client.send(`${json.message}`)
       }
    })
  })

  ws.onerror = function () {
     console.log('websocket error')
  }
})
