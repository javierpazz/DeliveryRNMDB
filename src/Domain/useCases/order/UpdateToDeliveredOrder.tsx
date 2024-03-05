import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Invoice } from '../../entities/Order';

const { updateToDelivered } = new OrderRepositoryImpl();

export const UpdateToDeliveredOrderUseCase = async (invoice: Invoice) => {
  return await updateToDelivered(invoice);
}
