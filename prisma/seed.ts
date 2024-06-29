import { prisma } from "../src/lib/prisma"

async function seed() {
  await prisma.event.create({
    data: {
      id: "5dfa625b-41be-4162-8f92-318a26a327d0",
      title: "Teste de evento",
      slug: "teste-de-evento",
      details: "Um evento para devs apaixonados(as) por código",
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log("Database seeded!")
  prisma.$disconnect()
})
