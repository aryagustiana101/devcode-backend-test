import { faker } from '@faker-js/faker'
import prisma from '../src/libs/prisma'

faker.setLocale('id_ID')

const seed = async (): Promise<void> => {
  if ((await prisma.activity.count()) < 1 || (await prisma.todo.count()) < 1) {
    const priority = ['very-high', 'high', 'medium', 'low', 'very-low']

    for (let i = 0; i < 5; i++) {
      const activity = await prisma.activity.create({
        data: {
          title: faker.lorem.sentence(3),
          email: faker.internet.email().toLowerCase()
        }
      })

      for (let j = 0; j < 20; j++) {
        await prisma.todo.create({
          data: {
            title: faker.lorem.sentence(5),
            is_active: Math.random() >= 0.5,
            priority: priority[Math.floor(Math.random() * priority.length)],
            activity: { connect: { id: activity.id } }
          }
        })
      }
    }
  }
}

seed().catch((err) => {
  console.error(err)
})
