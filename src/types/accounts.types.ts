export type AccountTypeKey = 'internal' | 'apple';

export type AccountTypeInternal = {
  id: string;
  type: 'internal';
  nickname: string;
  email: string;
  password: string;
};

export type AccountTypeApple = {
  id: string;
  type: 'apple';
  appleId: string;
  nickname: string;
  email?: string;
};

export type AccountType = AccountTypeInternal | AccountTypeApple;

export type PublicAccountType = {
  id: string;
  type: AccountTypeKey;
  nickname: string;
  email?: string;
  createdAt: number;
};

export type AccountUpdateType = {
  nickname?: string;
  email?: string;
  password?: string;
};

export interface IAccountService {
  getAccountById: (id: string) => Promise<PublicAccountType>;
  getAccountByEmail: (email: string) => Promise<PublicAccountType>;
  createInternalAccount: (
    nickname: string,
    email: string,
    password: string,
  ) => Promise<PublicAccountType>;
  createAppleAccount: (
    appleId: string,
    nickname: string,
    email?: string,
  ) => Promise<PublicAccountType>;
  updateAccount: (updates: AccountUpdateType) => Promise<PublicAccountType>;
}
