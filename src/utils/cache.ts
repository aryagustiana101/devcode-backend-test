import cache from '../libs/node-cache'

export const getOrSetCache = async (key: string, callback: () => {}): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const cached = cache.get(key)

    if (cached !== undefined) return resolve(cached)

    const result = callback()

    cache.set(key, result)

    return resolve(result)
  })
}
