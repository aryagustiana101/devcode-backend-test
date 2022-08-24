import 'dotenv/config'
import http from 'http'
import app from '../app'
import debugLib from 'debug'

const debug = debugLib('devcode-backend-test:server')

const port = normalizePort(process.env.PORT || '3030')
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}

function onError(error: { syscall: string; code: unknown }) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
  debug(`Listening on ${bind}`)
}