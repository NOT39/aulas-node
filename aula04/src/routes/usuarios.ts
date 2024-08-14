import { atualizarUsuario } from "../controllers/atualizar-usuario-controller";
import { cadastrarUsuario } from "../controllers/cadastrar-usuario-controller";
import { deletarUsuario } from "../controllers/deletar-usuario-controller";
import { listarUsuario } from "../controllers/listar-usuario-controller";
import { pegarUsuario } from "../controllers/pegar-usuario-controller";
import { Router } from "express";

export const usuariosRouter = Router({})

usuariosRouter.get('/usuarios', listarUsuario)

usuariosRouter.get('/usuarios/:id', pegarUsuario)

usuariosRouter.post('/usuarios', cadastrarUsuario)

usuariosRouter.put('/usuarios/:id', atualizarUsuario)

usuariosRouter.delete('/usuarios/:id', deletarUsuario)