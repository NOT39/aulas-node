import express from "express"
import { z, ZodError } from 'zod'
import { StatusCodes } from "http-status-codes"
import { PrismaClient } from "@prisma/client"

const app = express()

const prisma = new PrismaClient({ log: ['query'] })

app.use(express.json())

app.get('/usuarios', async (req, res) => {    
    const pegarUsuariosQueryParamsSchema = z.object({
        inicial: z.string().optional()
    })
    
    try {
        // Query Params
        const { inicial } = pegarUsuariosQueryParamsSchema.parse(req.query)

        const usuarios = await prisma.usuario.findMany({
            where: {
                nome: {
                    startsWith: inicial
                }
            }
        })
        
        return res.json({usuarios})
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro de validação.'
            })
        }
        
        throw err
    }
    
})

app.get('/usuarios/:id', (req, res) => {
    const pegarUsuarioRouteParamsSchema = z.object({
        id: z.string().uuid()
    })

    let id

    try {
        const params = pegarUsuarioRouteParamsSchema.parse(req.params)
        
        id = params.id
    } catch(err) {
        if (err instanceof ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'ID precisa ser um UUID.'
            })
        }
        
        throw err
    }

    const usuario = usuarios.find((usuario) => usuario.id === id)
    
    if (!usuario) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Recurso não encontrado.'
        })
    }

    return res.status(StatusCodes.OK).json({
        usuario
    })
})

app.post('/usuarios', async (req, res) => {

    const cadastrarUsuarioBodySchema = z.object({
        nome: z.string().min(2),
        email: z.string().email(),
        senha: z.string().min(6),
        descricao: z.string(),
        avatarUrl: z.string().optional(),
        coverUrl: z.string().optional()
    })

    // // Body Params
    // const { name } = req.body
    
    try {
        const { nome, descricao, email, senha, avatarUrl, coverUrl } = cadastrarUsuarioBodySchema.parse(req.body)

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                descricao,
                hash_senha: senha,
                avatar_url: avatarUrl,
                cover_url: coverUrl
            }
        })

        return res.status(201).json({ message: "Tudo certo!", usuario })
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