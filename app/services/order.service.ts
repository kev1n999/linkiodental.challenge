import { Document } from "mongoose";
import { Order, OrderProps, Service } from "../models/order.model.js";

export async function create(
  lab: string,
  patient: string,
  customer: string,
  services: Service[]
): Promise<OrderProps> {
  if (!services || services.length === 0)
    throw new Error("É necessário ao minímo 1 serviço!");

  const totalVal = services.reduce((sum, s) => sum + s.value, 0);

  if (totalVal <= 0)
    throw new Error(
      "O valor total do pedido é inválido, ele precisa ser maior que 0!"
    );

  const order = await Order.create({
    lab,
    patient,
    customer,
    services,
  });

  return order;
}

export async function list(state: string): Promise<OrderProps[]> {
  const orders = await Order.find({ state: state });

  if (!orders || orders.length === 0) {
    throw new Error("Não foi encontrado nenhum pedido válido!");
  }

  return orders;
}

export async function advance(id: string): Promise<OrderProps> {
  if (!id) throw new Error("O ID do pedido não foi informado!");

  const order = await Order.findById(id);

  if (!order) throw new Error("Não foi possível encontrar o pedido!");

  switch (order.state) {
    case "CREATED":
      order.state = "ANALYSIS";
      break;

    case "ANALYSIS":
      order.state = "COMPLETED";
      break;

    case "COMPLETED":
      throw new Error("O pedido já foi concluído!");
  }

  await order.save();
  return order;
}
