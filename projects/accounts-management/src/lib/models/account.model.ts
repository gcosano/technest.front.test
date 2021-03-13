export interface Account {
    id: string;
    name: string;
    category: string;
    tag?: string;
    balance?: number;
    availableBalance?: number;
    ordersList?: Array<unknown>;
}
