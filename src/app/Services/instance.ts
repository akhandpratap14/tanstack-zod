import axios from "axios";
import { useRouter } from "next/navigation";

const Instance = () => {
  const router = useRouter();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  const serverInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401:
          router.push("/login");
          break;

        case 422:
          break;

        case 500:
          console.log(error);
          break;

        default:
          break;
      }
      return Promise.reject(error);
    }
  );
  return { instance, serverInstance };
};

export default Instance;
