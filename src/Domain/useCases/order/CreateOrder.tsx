import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Invoice } from '../../entities/Order';

const { create } = new OrderRepositoryImpl();

export const CreateOrderUseCase = async (invoice: Invoice) => {
  return await create(invoice);
}
