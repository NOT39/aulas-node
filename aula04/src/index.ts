import express from "express"

import { z, ZodError } from 'zod'

const usuarios = []

const app = express()

app.use(express.json())

app.get('/usuarios', (req, res) => {    
    // Query Params
    const { inicial } = req.query

    if (inicial) {
        const usuariosFiltrados = usuarios.filter((nome) => nome.startsWith(inicial))

        return res.json({usuarios: usuariosFiltrados})
    } 
    
    return res.json({usuarios})
})

app.post('/usuarios', (req, res) => {

    const cadastrarUsuarioBodySchema = z.object({
        name: z.string().min(2)
    })

    // // Body Params
    // const { name } = req.body
    
    try {
        const { name } = cadastrarUsuarioBodySchema.parse(req.body)

        usuarios.push({
            name,
            id: crypto.randomUUID()
        })

        return res.status(201).json({ message: "Tudo certo!" })
    } catch(err) {
        if(err instanceof ZodError) {
            return res.status(400).json({message: "Erro de validação."})
        }
        
        throw err
    }
})

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const usuario = usuarios.find(valor => valor.id === id)

    if(!usuario) {
        return res.status(400).json({message: "Usuário não encontrado."})
    }

    usuario.name = name

    return res.status(200).json({usuario})
})

app.delete('/usuarios/:id', (req, res) => {
    // Route param
    const { id } = req.params

    const indiceDoValorASerDeletado = usuarios.findIndex(usuario => usuario.id === id)

    if (indiceDoValorASerDeletado < 0) {
        return res.status(400).json({message: "Usuário não encontrado."})
    }

    usuarios.splice(indiceDoValorASerDeletado, 1)
    
    return res.status(204).send()
})

app.get('/bem-vindo', (req, res) => {
    return res.send("Sejá bem-vindo!")
})

app.listen(3333, () => {
    console.log("Aplicação rodando na porta: 3333")
})