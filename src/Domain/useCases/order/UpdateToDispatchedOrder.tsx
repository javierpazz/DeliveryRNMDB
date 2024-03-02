import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Invoice } from '../../entities/Order';

const { updateToDispatched } = new OrderRepositoryImpl();

export const UpdateToDispatchedOrderUseCase = async (invoice: Invoice) => {
  return await updateToDispatched(invoice);
}
