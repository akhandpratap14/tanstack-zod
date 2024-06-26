import axios from "axios";
import { useRouter } from "next/navigation";
import Instance from "./instance";

const useApi = () => {
  const { instance: api } = Instance();

  const login = async (obj: any) => {
    const response = await api.post("auth/login", obj);
    return response;
  };

  const fetchData = async () => {
    const response = await api.get("products?limit=5");
    return response.data.data;
  };

  return {
    fetchData,
    login,
  };
};

export default useApi;
