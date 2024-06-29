import fastify from "fastify"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event"
import { registerForEvent } from "./routes/register-for-event"
import { getEvent } from "./routes/get-event"
import { getAttendeeBadge } from "./routes/get-attendee-bagde"
import { checkIn } from "./routes/check-in"
import { getEventAttendees } from "./routes/get-event-attendees"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import { errorHandler } from "./error-handler"
import fastifyCors from "@fastify/cors"

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Pass in",
      description:
        "Especificações da API para o backend passin construida durante o NLW Unite",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.get("/", async () => {
  return "Server is up and running!"
})

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server listening on port 3000")
})
