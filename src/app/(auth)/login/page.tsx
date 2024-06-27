"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormDataSchema } from "@/ZodSchema/LoginSchema";
import { CircularProgress } from "@mui/material";
import useApi from "@/Services/useApi";
import InputWrapper from "@/utils/inputWrapper";
import Image from "next/image";

type Inputs = z.infer<typeof LoginFormDataSchema>;

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login, fetchData } = useApi();

  // const {
  //   data: products,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: fetchData,
  //   refetchOnWindowFocus: false,
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormDataSchema),
  });

  const LoginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("response", response);
      toast.success("Login Succesfull", {
        duration: 1200,
      });
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data: any) => {
    let obj = {
      username: data.username,
      password: data.password,
    };
    LoginMutation.mutate(obj);
  };
  return (
    <div className="border h-3/4 w-3/4 border-teal-300 flex flex-row rounded-lg shadow-lg">
      <div className="h-full w-1/2 bg-orange-500 flex justify-center items-center rounded-lg">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <div className="text-4xl font-extrabold ">Welcome Back</div>
          <div className="text-lg font-light ">
            To keep connected with us please login with your personal info!
          </div>
          <button className="mt-5 h-14 border border-white w-44 flex justify-center items-center rounded-full cursor-pointer hvr-grow">
            SIGN IN
          </button>
        </div>
      </div>
      <div className="h-full w-1/2 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <div className="text-4xl font-bold text-black">Create Account</div>
          <Image
            className="border-[0.5px] cursor-pointer hover:shadow-md rounded-full p-2"
            src={"/logo/google.svg"}
            width={45}
            height={45}
            alt={"google"}
          />
          <div className="text-base text-gray-400 font-light">
            or use your email for refistration
          </div>
          <div className="flex flex-col mb-5  w-80 justify-center items-center ">
            <form
              className="flex w-full flex-col justify-center items-center"
              onSubmit={handleSubmit(processForm)}
            >
              <div className="w-full relative mb-4">
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md h-12 bg-gray-100 text-black px-2 focus:outline-none peer placeholder-transparent"
                  placeholder="name"
                  {...register("name")}
                />
                <label htmlFor="name" className="label-primary">
                  Name
                </label>
              </div>
              <InputWrapper>
                <input
                  type="text"
                  id="email"
                  className="input-primary peer"
                  placeholder="email"
                  {...register("email")}
                />
                <label htmlFor="email" className="label-primary">
                  email
                </label>
              </InputWrapper>
              <InputWrapper>
                <input
                  type="text"
                  id="username"
                  className="input-primary peer"
                  placeholder="username"
                  {...register("username")}
                />
                <label htmlFor="username" className="label-primary">
                  username
                </label>
              </InputWrapper>
              <InputWrapper>
                <input
                  type="password"
                  id="password"
                  className="input-primary peer"
                  placeholder="password"
                  {...register("password")}
                />
                <label htmlFor="password" className="label-primary">
                  password
                </label>
              </InputWrapper>

              <button
                type="submit"
                className={`${
                  LoginMutation.isPending && "opacity-50"
                } w-56 h-12 shadow-lg hvr-grow justify-center cursor-pointer text-white mt-5 mb-5 rounded-full flex items-center px-5`}
              >
                {LoginMutation.isPending ? (
                  <CircularProgress
                    size={30}
                    color="success"
                    className="opacity-100"
                  />
                ) : (
                  "SIGN UP"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
