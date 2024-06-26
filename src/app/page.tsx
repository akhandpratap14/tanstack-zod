"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormDataSchema } from "./ZodSchema/LoginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "./Services/useApi";
import toast from "react-hot-toast";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

type Inputs = z.infer<typeof LoginFormDataSchema>;

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormDataSchema),
  });

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
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="h-96 text-black w-96 px-10 bg-teal-300 rounded-xl border-[0.5px] flex flex-col gap-y-3 justify-center items-center">
        <div className="mb-5"> Welcome to Login!</div>
        <div className="flex flex-col mb-5  w-full justify-center items-center ">
          <form onSubmit={handleSubmit(processForm)}>
            <input
              type="text"
              id="email"
              className="outline-none mb-3 w-full h-10 bg-transparent px-2 border border-black rounded-md"
              placeholder="email"
              {...register("email")}
            />

            <input
              type="text"
              id="username"
              className="outline-none mb-3 w-full h-10 bg-transparent px-2 border border-black rounded-md"
              placeholder="username"
              {...register("username")}
            />

            <input
              type="password"
              id="password"
              className="outline-none w-full mt-3 h-10 border border-black rounded-md bg-transparent px-2"
              placeholder="password"
              {...register("password")}
            />

            <button
              type="submit"
              className={`${
                LoginMutation.isPending && "opacity-50"
              } w-full h-10 shadow-lg bg-blue-500 hover:bg-blue-700 justify-center cursor-pointer text-white mt-5 mb-5 rounded-md flex items-center px-5`}
            >
              {LoginMutation.isPending ? (
                <CircularProgress
                  size={30}
                  color="success"
                  className="opacity-100"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
