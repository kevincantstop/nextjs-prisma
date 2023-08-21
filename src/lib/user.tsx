"use server";
import { prisma } from "@/lib/db";
import { SignUpInputs } from "@/lib/types";
import { signIn } from "next-auth/react";

const registerUser = async (data: SignUpInputs) => {
  const account = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  signIn("credentials", {
    ...account,
  });
};

export { registerUser };
