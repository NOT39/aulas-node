import express from "express"
import { usuariosRouter } from "routes/usuarios"
import cors from 'cors'

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use(usuariosRouter)

app.listen(3333, () => {
    console.log("Aplicação rodando na porta: 3333")
})