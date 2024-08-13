import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { z } from "zod"

export async function deletarUsuario (req: Request, res: Response) {
    const deletarUsuarioRouteParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { success: routeParamsValidationSuccess, data: params } = deletarUsuarioRouteParamsSchema.safeParse(req.params)

    if (!routeParamsValidationSuccess) {
        return res.status(400).json({message: 'ID precisa ser um UUID!'})
    }

    const usuarioExists = await prisma.usuario.findUnique({
        where: {
            id: params.id
        }
    })

    if(!usuarioExists) {
        return res.status(400).json({message: "Usuário não encontrado."})
    }

    await prisma.usuario.delete({
        where: {
            id: params.id
        }
    })
    
    return res.status(204).send()
}