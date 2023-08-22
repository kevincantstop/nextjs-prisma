"use client";
import { signOut } from "next-auth/react";

export default function Todo() {
  return (
    <button
      onClick={() => signOut()}
      className={`rounded bg-stone-300 text-white px-3 py-2 text-sm hover:bg-stone-400 border border-stone-400`}
    >
      Logout
    </button>
  );
}
