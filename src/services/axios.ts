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

  export const getUserProfile = () =>
    axios
      .get<{ user: UserProfileType }>('/user/profile')
      .then((res) => res.data.user);

  export const authenticateUser = (data: { email: string; password: string }) =>
    axios
      .post<{ user: UserProfileType }>('/auth/login', data)
      .then((res) => res.data.user);

  export type UserBalanceType = {
    id: string;
    btc: number;
    eth: number;
    bnb: number;
    usdt: number;
    user_id: string;
  };

  export const getUserBalance = () =>
    axios
      .get<{ asset: UserBalanceType }>('/asset/balance')
      .then((res) => res.data.asset);
}

export default AxiosService;
