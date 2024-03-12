import { useEffect, useState } from "react";
import axios from "../AxiosCredintialsCookie";

export const useProduct = ({ setLoadingToGetProduct, productId }) => {
  const [productFetched, setProductFetched] = useState({});
  useEffect(() => {
    const getProductById = async () => {
      setLoadingToGetProduct(true);

      try {
        const res = await axios.get(`/products/${productId}`);
        if (res.status === 200) {
          setProductFetched(res.data?.product);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingToGetProduct(false);
      }
    };
    getProductById();
  }, []);
  return { productFetched };
};
