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
}

export default AxiosService;
