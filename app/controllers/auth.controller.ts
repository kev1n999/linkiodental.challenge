import { Request, Response } from "express";
import { login, register } from "../services/auth.service.js";

export async function userRegister(req: Request, res: Response) {
  try {
    // Email e senha enviados pelo corpo da requisição
    const { email, password } = req.body;

    // Verifica se as credenciais foram preenchidas e enviadas corretamente
    if (!email || !password) {
      return res.status(400).json({
        message: "Você deve inserir as credenciais email e senha.",
      });
    }

    // Registra o usuário no banco de dados
    await register(email, password);
    return res.status(200).json({
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (err: any) {
    return res.status(401).json({
      message: err.message || "Erro ao cadastrar usuário",
    });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    // Email e senha enviados pelo corpo da requisição
    const { email, password } = req.body;

    // Verifica se as credenciais foram preenchidas e enviadas corretamente
    if (!email || !password) {
      return res.status(400).json({
        message: "Você deve inserir as credenciais email e senha.",
      });
    }

    // Gera o JWT após a autenticação
    const token = await login(email, password);

    // Retorna o JWT
    return res.status(200).json({
      token,
    });
  } catch (err: any) {
    return res.status(401).json({
      message: "Não foi possível efetuar o login deste usuário!",
    });
  }
}
