import { Request, Response } from "express";
import { advanced, create, list } from "../services/order.service.js";

// Controller para criação de pedidos
export async function createOrder(req: Request, res: Response) {
  try {
    const { lab, patient, customer, services } = req.body;

    const order = await create(lab, patient, customer, services);
    res.status(200).json(order);
  } catch (err: any) {
    return res.status(501).json({
      message: "Não foi possível criar este pedido!",
    });
  }
}

// Controller para listar pedidos
export async function listOrders(req: Request, res: Response) {
  try {
    await list();
  } catch (err) {
    console.error(err);
  }
}

// Controller para avanço de pedidos
export async function advancedOrder(req: Request, res: Response) {
  try {
    await advanced();
  } catch (err) {
    console.error(err);
  }
}
