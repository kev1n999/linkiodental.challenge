import { Document, Schema, model } from "mongoose";

type serviceStatus = "PENDING" | "DONE";

type orderState = "CREATED" | "ANALYSIS" | "COMPLETED";
type orderStatus = "ACTIVE" | "DELETED";

export interface Service {
  name: string;
  value: number;
  status: serviceStatus;
}

export interface OrderProps extends Document {
  lab: string;
  patient: string;
  customer: string;

  state: orderState;
  status: orderStatus;
  services: Service[];
}

const serviceSchema = new Schema<Service>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "DONE"], default: "PENDING" },
});

const orderSchema = new Schema<OrderProps>({
  lab: { type: String, required: true },
  patient: { type: String, required: true },
  customer: { type: String, required: true },

  state: {
    type: String,
    enum: ["CREATED", "ANALYSIS", "COMPLETED"],
    default: "CREATED",
  },
  status: { type: String, enum: ["ACTIVE", "DELETED"], default: "ACTIVE" },
  services: {
    type: [serviceSchema],
    required: true,
    validate: {
      validator: (v: Service[]) => v.length > 0,
      message: "É necessário ter ao menos 1 serviço!",
    },
  },
});

export const Order = model<OrderProps>("Order", orderSchema);
