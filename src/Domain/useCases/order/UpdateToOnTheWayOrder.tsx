import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Invoice } from '../../entities/Order';

const { updateToOnTheWay } = new OrderRepositoryImpl();

export const UpdateToOnTheWayOrderUseCase = async (invoice: Invoice) => {
  return await updateToOnTheWay(invoice);
}
