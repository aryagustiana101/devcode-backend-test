import 'dotenv/config'
import http from 'http'
import app from '../app'
import { cpus } from 'os'
// import debugLib from 'debug'
import cluster from 'cluster'

const numCPUs = cpus().length

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid ?? ''} died`)
    cluster.fork()
  })
} else {
  // const debug = debugLib('devcode-backend-test:server')
  // const port = normalizePort(process.env.PORT ?? '3030')
  const port = process.env.PORT ?? '3030'

  app.set('port', port)

  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`App listening on port ${port.toString()} at process ${process.pid}`)
  })

  // server.on('error', onError)
  // server.on('listening', onListening)

  // function normalizePort(val: string): number | string | boolean {
  //   const port = parseInt(val, 10)
  //   if (isNaN(port)) return val
  //   if (port >= 0) return port
  //   return false
  // }

  // function onError(error: { syscall: string; code: unknown }): void {
  //   if (error.syscall !== 'listen') throw new Error(error.syscall)
  //   const bind = typeof port === 'string' ? `Pipe  ${port.toString()}` : `Port ${port.toString()}`
  //   switch (error.code) {
  //     case 'EACCES':
  //       console.error(bind + ' requires elevated privileges')
  //       process.exit(1)
  //       break
  //     case 'EADDRINUSE':
  //       console.error(bind + ' is already in use')
  //       process.exit(1)
  //       break
  //     default:
  //       throw new Error(error.syscall)
  //   }
  // }

  // function onListening(): void {
  //   const addr = server.address()
  //   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port ?? ''}`
  //   debug(`Listening on ${bind}`)
  // }
}
