import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Invoice } from '../../entities/Order';

const { getByClientAndStatus } = new OrderRepositoryImpl();

export const GetByClientAndStatusOrderUseCase = async (idClient: string, status: string) => {
  return await getByClientAndStatus(idClient, status);
}
