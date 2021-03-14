import { Account } from "../models/account.model";

export const mockAccountsList: Array<Account> = [
    {
      id: 'id1',
      name: 'name1',
      category: 'category1',
      tag: 'tag1',
      balance: 0,
      availableBalance: 0,
      ordersList: []
    },
    {
      id: 'id2',
      name: 'name2',
      category: 'category2',
      tag: 'tag2',
      balance: 0,
      availableBalance: 0,
      ordersList: []
    },
    {
      id: 'id3',
      name: 'name3',
      category: 'category3',
      tag: 'tag3',
      balance: 0,
      availableBalance: 0,
      ordersList: []
    }
  ];

  export const mockActiveRoute = {
    snapshot: {
      params: {
        id: 'id1'
      }
    }
  }