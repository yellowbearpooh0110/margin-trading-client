export type SelectOptionType<T = string> = {
  value: T;
  label: string;
  type?: 'network' | 'coin';
};

export interface CoinSelectOptionType extends SelectOptionType {
  coin_id: string;
}

export type NetworkType = 'ethereum' | 'binance' | 'avalanche';

export const networkOptions: Array<SelectOptionType<NetworkType>> = [
  { value: 'ethereum', label: 'Ethereum Mainnet' },
  { value: 'binance', label: 'Binance Smart Chain' },
  { value: 'avalanche', label: 'Avalanche C-Chain' }
];

export const coinOptions: {
  [key in NetworkType]: Array<CoinSelectOptionType>;
} = {
  ethereum: [
    { value: 'eth', label: 'Ether', type: 'coin', coin_id: 'ethereum' },
    { value: 'usdt', label: 'Tether USD', type: 'coin', coin_id: 'tether' },
    { value: 'dai', label: 'Dai Stablecoin', type: 'coin', coin_id: 'dai' }
  ],
  binance: [
    { value: 'bnb', label: 'BNB', type: 'coin', coin_id: 'binancecoin' },
    { value: 'usdt', label: 'Tether USD', type: 'coin', coin_id: 'tether' },
    {
      value: 'busd',
      label: 'Binance USD',
      type: 'coin',
      coin_id: 'binance-usd'
    }
  ],
  avalanche: [
    { value: 'avax', label: 'AVAX', type: 'coin', coin_id: 'avalanche-2' }
  ]
};
