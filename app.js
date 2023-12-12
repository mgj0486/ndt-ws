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
    if (json.message != undefined) {
      let str = json.message;
      let arr = str.split("  ");
      if (arr.length !== 24) {
        sockserver.clients.forEach(client => {
          const err = {
            error: 'data not correct',
            message: str
          }
          const jsonData = JSON.stringify(err);
          client.send(jsonData) 
        })
      } else {
        const data = {
          num : arr[0],
          status: {
            burb: arr[1],
            bellStatus: arr[2],
            led: arr[3],
            hpmc: arr[4],
            alert: arr[5],
            bellWork: arr[6],
            shockValue: arr[7],
            detectNum: arr[8]
          },
          battery: {
            ess: arr[9],
            hpmcV: arr[10],
            hpmcI: arr[11],
            solarV: arr[12],
            solarI: arr[13]
          },
          env: {
            grimm1_0: arr[14],
            grimm2_5: arr[15],
            grimm10: arr[16],
            vocNow: arr[17],
            vocRef: arr[18],
            vocPer: arr[19],
            voclev: arr[20],
            co2: arr[21],
            temp: arr[22],
            humi: arr[23]
          }
        } 
        const jsonData = JSON.stringify(data);
        sockserver.clients.forEach(client => {
          client.send(jsonData) 
        })
      }
    } else {
      if (json.controll != undefined) {
        sockserver.clients.forEach(client => {
          const jsonData = JSON.stringify(json);
          client.send(jsonData)
        })
      }
    }
  })

  ws.onerror = function () {
     console.log('websocket error')
  }
})
