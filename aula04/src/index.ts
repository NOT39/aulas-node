import express from "express"
import { PrismaClient } from "@prisma/client"
import { listarUsuario } from "controllers/listar-usuario-controller"
import { pegarUsuario } from "controllers/pegar-usuario-controller"
import { cadastrarUsuario } from "controllers/cadastrar-usuario-controller"
import { atualizarUsuario } from "controllers/atualizar-usuario-controller"
import { deletarUsuario } from "controllers/deletar-usuario-controller"

const app = express()

export const prisma = new PrismaClient({ log: ['query'] })

app.use(express.json())

app.get('/usuarios', listarUsuario)

app.get('/usuarios/:id', pegarUsuario)

app.post('/usuarios', cadastrarUsuario)

app.put('/usuarios/:id', atualizarUsuario)

app.delete('/usuarios/:id', deletarUsuario)

app.listen(3333, () => {
    console.log("Aplicação rodando na porta: 3333")
})