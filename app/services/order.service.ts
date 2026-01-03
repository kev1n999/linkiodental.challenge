import { Order, OrderProps, Service } from "../models/order.model.js";

export async function create(
  lab: string,
  patient: string,
  customer: string,
  services: Service[]
): Promise<OrderProps> {
  if (!services || services.length === 0)
    throw new Error("É necessário ao minímo 1 serviço!");

  try {
    const order = await Order.create({
      lab,
      patient,
      customer,
      services,
    });

    return order;
  } catch (err) {
    console.error(err);
    throw new Error("Não foi possível criar esse pedido.");
  }
}

export async function list(): Promise<void> {}

export async function advanced(): Promise<void> {}
