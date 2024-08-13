import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { prisma } from "../lib/prisma"
import { z, ZodError } from "zod"

export async function pegarUsuario(req: Request, res: Response) {
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

    const usuario = await prisma.usuario.findUnique({
        where: {
            id
        }
    })
    
    if (!usuario) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Recurso não encontrado.'
        })
    }

    return res.status(StatusCodes.OK).json({
        usuario
    })
}