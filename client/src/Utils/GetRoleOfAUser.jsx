import axios from "../AxiosCredintialsCookie";

export const GetRoleOfAUser = () => {
  const getRoleOfAUser = async () => {
    try {
      const response = await axios.get("/auth/me/role");
      return response?.data?.role;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getRoleOfAUser,
  };
};
