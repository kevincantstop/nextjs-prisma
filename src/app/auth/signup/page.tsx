"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpInputs as Inputs } from "@/lib/types";
import { registerUser } from "@/lib/user";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => registerUser(data);

  return (
    <div className={`flex h-screen`}>
      <div className="m-auto w-[320px] shadow-lg rounded-lg p-5 border border-stone-100">
        <h1 className={`w-full text-center mb-5 font-bold pb-3 uppercase`}>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex justify-between`}>
            <label className={`text-sm pt-2 w-1/3 text-end pr-3`}>Email</label>
            <input
              type="text"
              className={`border border-stone-200 outline-none rounded py-2 px-2 w-2/3 focus:border-pink-400 text-sm hover:border-pink-200`}
              {...register("email")}
            />
          </div>
          <div className={`flex justify-between mt-5`}>
            <label className={`text-sm pt-2 w-1/3 text-end pr-3`}>Name</label>
            <input
              type="text"
              className={`border border-stone-200 outline-none rounded py-2 px-2 w-2/3 focus:border-pink-400 text-sm hover:border-pink-200`}
              {...register("name")}
            />
          </div>
          <div className={`flex justify-between mt-5`}>
            <label className={`text-sm pt-2 w-1/3 text-end pr-3`}>
              Password
            </label>
            <input
              type="password"
              className={`border border-stone-200 outline-none rounded py-2 px-2 w-2/3 focus:border-pink-400 text-sm hover:border-pink-200`}
              {...register("password")}
            />
          </div>
          <div className={`flex justify-center px-1`}>
            <button
              type="submit"
              className={`mt-5 bg-pink-400 w-full p-2 rounded-full text-white hover:bg-pink-500 text-sm shadow-lg`}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className={`flex justify-center mt-5`}>
          <span className={`text-sm mr-2 mt-[-2px]`}>Already a member ?</span>
          <Link
            href="/auth/signin"
            className={`text-xs font-bold text-pink-400 border-b-[1px] hover:border-pink-400 pb-1 border-transparent hover:text-pink-500`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
