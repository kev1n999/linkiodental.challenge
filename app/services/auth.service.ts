import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export async function register(email: string, password: string): Promise<void> {
  // Verifica se o usuário já está registrado no banco de dados
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Usuário já cadastrado!");

  try {
    // Cria um hash a partir da senha enviada
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registra o usuário no banco de dados
    await User.create({
      email: email,
      password: hashedPassword,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Não foi possível registrar o usuário!");
  }
}

export async function login(email: string, password: string): Promise<string> {
  // Verifica se o usuário está registrado no banco de dados
  const userExists = await User.findOne({ email });
  if (!userExists) throw new Error("Usuário não identificado!");
  // Verifica se a senha enviada coincide com a senha armazenada no banco de dados
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) throw new Error("As senhas não coincidem!");
  
  try {
    // Gera o JWT com expiração de até 1h
    const token = jwt.sign({ id: userExists._id }, env.jwtsecret, {
      expiresIn: "1h",
    });

    // Retorna o JWT
    return token;
  } catch (err) {
    console.error(err);
    throw new Error("Não foi possível efetuar o login deste usuário!");
  }
}
