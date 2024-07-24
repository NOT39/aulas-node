import express from "express"

const nomes = []

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({nomes})
})

app.post('/', (req, res) => {
    const { name } = req.body

    nomes.push(name)

    return res.status(201).json({ message: "Tudo certo!" })
})

app.get('/bem-vindo', (req, res) => {
    return res.send("Sejá bem-vindo!")
})

app.listen(3333, () => {
    console.log("Aplicação rodando na porta: 3333")
})