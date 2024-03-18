import axios from "../AxiosCredintialsCookie";

export const GetOwnProfile = ({ setLoadingToGetProfile }) => {
  const getOwnProfile = async () => {
    setLoadingToGetProfile(true);
    try {
      const response = await axios.get("/auth/me");
      return response.data?.user;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingToGetProfile(false);
    }
  };
  return {
    getOwnProfile,
  };
};
