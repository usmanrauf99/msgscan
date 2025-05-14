export interface NetworkStats {
  activeNodes: number;
  nodeVolume: number;
  totalMsgAccumulated: string;
  totalMsgClaimed: string;
  nodeStatusBreakdown: {
    active: number;
    inactive: number;
  };
  transactionsToday: number;
  lifetimeTransactions: number;
  msgStats: {
    totalMinted: string;
    rewardPerValidation: number;
  };
}

export interface ValidatorStats {
  address: string;
  tokensMined: string;
  transactionsSigned: number;
  timestamp?: string;
  validatorName?: string;
}

export interface NetworkLifetimeStats {
  totalTransactions: number;
  totalMsgMinted: string;
  currentMsgReward: number;
  nextValidatorToSubmitTransaction: string;
  topPerformingValidators: ValidatorStats[];
}

export interface Validator {
  address: string;
  tokensMined: string;
  transactionsSigned: number;
  transactionsSubmitted: number;
}

export interface ValidatorsResponse {
  validators: Validator[];
}

export interface StatusResponse {
  publicKey: string;
  signer: string | null;
  myNetworkTime: string | null;
  totalNetworkTime: string | null;
}

export interface ValidatorDetailResponse {
  validator: Validator;
}

export interface EcosystemNode {
  node_id: string;
  address: string;
  tokensMined: string;
  transactionsSigned: number;
  transactionsSubmitted: number;
  status: string;
}

export interface Transaction {
  hash: string;
  timestamp: string;
  addresses: string[];
  event: string;
  fee: string;
  blockNumber: number;
  isConfirmed: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TransactionsResponse {
  recentTransactions: Transaction[];
  pagination: Pagination;
}

export interface AddressTransactionsResponse {
  transactions: Transaction[];
  pagination: Pagination;
  totalTransactions?: number;
}
