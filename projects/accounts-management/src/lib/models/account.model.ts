import { Order } from "./order.model";

export interface Account {
    id: string;
    name: string;
    category: string;
    tag?: string;
    balance?: number;
    availableBalance?: number;
    ordersList?: Array<Order>;
}
