import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { z, ZodError } from "zod"

export async function cadastrarUsuario (req: Request, res: Response) {

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
}