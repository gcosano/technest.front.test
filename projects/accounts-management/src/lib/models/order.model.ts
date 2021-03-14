export interface Order {
    id: string;
    accountId: string;
    orderId: string;
    confirmedDate: Date;
    code: string;
    type: string;
    debitAmount: number;
    creditAmount: number;
    balance: number;
}