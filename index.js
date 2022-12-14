
const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())
const port = 3000

const users = []

const CheckUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.UserIndex = index
    request.UserId = id

    next()
}


app.get('/route', (request, response) => {

    return response.json(users)
})

app.post('/route', (request, response) => {

    const { name, age } = (request.body)
    const user = { id: uuid.v4(), name, age }
    users.push(user)

    return response.status(201).json(users)
})

app.put('/route/:id', CheckUserId, (request, response) => {
    const { name, age } = request.body
    const id = request.UserId
    const index = request.UserIndex


    const userUpdate = { id, name, age }

    users[index] = userUpdate

    return response.json(userUpdate)
})

app.delete('/route/:id',CheckUserId, (request, response) => {
    const index = request.UserIndex
    users.splice(index, 1)

    return response.status(204).json({ message: "User deleted" })
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
