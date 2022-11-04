import axios from 'axios';

namespace AxiosService {
  export type UserProfileType = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
  };

  export const getUserProfile = async () => {
    const response = await axios.get<{ user: UserProfileType }>(
      '/user/profile'
    );
    return response.data.user;
  };

  export const authenticateUser = async (data: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post<{ user: UserProfileType }>(
      '/auth/login',
      data
    );
    return response.data.user;
  };

  export type UserBalanceType = {
    id: string;
    btc: number;
    eth: number;
    bnb: number;
    usdt: number;
    user_id: string;
  };

  export const getUserBalance = async () => {
    const response = await axios.get<{ asset: UserBalanceType }>(
      '/asset/balance'
    );
    return response.data.asset;
  };

  export type CoinGeckoCoinType = {
    id: string;
    name: string;
    symbol: string;
    platforms?: { [key in string]?: string };
  };

  export const getCoinsList = async (include_platform = false) => {
    const response = await axios.get<Array<CoinGeckoCoinType>>(
      'https://api.coingecko.com/api/v3/coins/list',
      { params: { include_platform } }
    );
    return response.data;
  };

  export type MarketChartDataType = {
    prices: Array<[number, number]>;
  };

  export const getMarketChart = async (coin_id = 'bitcoin') => {
    const response = await axios.get<MarketChartDataType>(
      `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: 30
        }
      }
    );
    return response.data;
  };
}

export default AxiosService;
