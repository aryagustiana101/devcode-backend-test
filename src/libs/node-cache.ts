import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 15, checkperiod: 20 })

export default cache
