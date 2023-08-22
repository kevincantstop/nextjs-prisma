import Todo from "@/app/components/Todo";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllTasks } from "@/lib/todo";
import { redirect } from "next/navigation";
import Logout from "@/app/components/Logout";

export default async function Page() {
  const tasks = await getTasks();
  return (
    <main className="flex h-screen relative">
      <div className={`absolute right-0 p-5`}>
        <Logout />
      </div>
      <div className={`m-auto`}>
        <Todo data={tasks} />
      </div>
    </main>
  );
}

async function getTasks() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/signin");
  }
  return getAllTasks(session.user?.id!);
}
