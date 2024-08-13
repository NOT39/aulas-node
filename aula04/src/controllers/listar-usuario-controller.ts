import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { prisma } from "../lib/prisma"
import { z, ZodError } from "zod"

export async function listarUsuario(req: Request, res: Response) {
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

        return res.json({ usuarios })
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro de validação.'
            })
        }

        throw err
    }

}