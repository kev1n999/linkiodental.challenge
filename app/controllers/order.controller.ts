import { Request, Response } from "express";
import { advance, create, list } from "../services/order.service.js";

// Controller para criação de pedidos
export async function createOrder(req: Request, res: Response) {
  try {
    const { lab, patient, customer, services } = req.body;

    const order = await create(lab, patient, customer, services);
    res.status(201).json(order);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Não foi possível criar este pedido!",
    });
  }
}

// Controller para listar pedidos
export async function listOrders(req: Request, res: Response) {
  try {
    const { state } = req.body;

    const orders = await list(state);
    res.status(200).json(orders);
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({
      message: err.message || "Não foi possível listar os pedidos!",
    });
  }
}

// Controller para avanço de pedidos
export async function advancedOrder(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const order = await advance(id);
    res.status(200).json(order);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({
      message: err.message || "Não foi possível avançar o state deste pedido!",
    });
  }
}
