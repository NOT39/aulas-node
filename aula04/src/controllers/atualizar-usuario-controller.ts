import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { z } from "zod"

export async function atualizarUsuario (req: Request, res: Response) {
    const atualizarUsuarioRouteParamsSchema = z.object({
        id: z.string().uuid()
    })

    const atualizarUsuarioBodyParamsSchema = z.object({
        nome: z.string().optional(),
        email: z.string().optional(),
        descricao: z.string().optional(),
        avatar_url: z.string().url().optional(),
        cover_url: z.string().optional()
    })
    
    const { success: routeParamsValidationSuccess, data: params } = atualizarUsuarioRouteParamsSchema.safeParse(req.params)

    if (!routeParamsValidationSuccess) {
        return res.status(400).json({message: 'ID precisa ser um UUID!'})
    }

    const { success: bodyParamsValidationSuccess, data: body } = atualizarUsuarioBodyParamsSchema.safeParse(req.body)

    if (!bodyParamsValidationSuccess) {
        return res.status(400).json({message: 'Erro de validação.'})
    }

    const usuarioExists = await prisma.usuario.findUnique({
        where: {
            id: params.id
        }
    })

    if(!usuarioExists) {
        return res.status(400).json({message: "Usuário não encontrado."})
    }

    const usuario = await prisma.usuario.update({
        where: {
            id: params.id
        },
        data: body
    })

    return res.status(200).json({usuario})
}