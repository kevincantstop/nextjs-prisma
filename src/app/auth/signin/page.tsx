"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInInputs as Inputs } from "@/lib/types";
import { signIn } from "next-auth/react";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signIn("credentials", { ...data });

  return (
    <div className={`flex h-screen`}>
      <div className="m-auto w-[320px] shadow-lg rounded-lg p-5 border border-stone-100">
        <h1 className={`w-full text-center mb-5 font-bold pb-3 uppercase`}>
          Sign In To TODO
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex justify-between`}>
            <label className={`text-sm pt-2 w-1/3 text-end pr-3`}>Email</label>
            <input
              type="text"
              {...register("email")}
              className={`border border-stone-200 outline-none rounded py-2 px-2 w-2/3 focus:border-sky-400 text-sm hover:border-sky-200`}
            />
          </div>
          <div className={`flex justify-between mt-5`}>
            <label className={`text-sm pt-2 w-1/3 text-end pr-3`}>
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`border border-stone-200 outline-none rounded py-2 px-2 w-2/3 focus:border-sky-400 text-sm hover:border-sky-200`}
            />
          </div>
          <div className={`flex justify-center px-1`}>
            <button
              className={`mt-5 bg-sky-400 w-full p-2 rounded-full text-white hover:bg-sky-500 text-sm shadow-lg`}
            >
              Sign In
            </button>
          </div>
          <div className={`flex justify-center mt-5`}>
            <Link
              href="/auth/signup"
              className={`text-xs font-bold text-sky-400 border-b-[1px] hover:border-sky-400 pb-1 border-transparent hover:text-sky-500`}
            >
              Sign Up Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
