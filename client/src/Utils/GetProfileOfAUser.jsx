import axios from "../AxiosCredintialsCookie";

export const GetProfileOfAUser = () => {
  const getProfileOfAUser = async (userId) => {
    try {
      const response = await axios.get(`/auth/admin/users/${userId}`);
      return response?.data?.user;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getProfileOfAUser,
  };
};
