import Todo from "@/app/components/Todo";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllTasks } from "@/lib/todo";
import { redirect } from "next/navigation";

export default async function Page() {
  const tasks = await getTasks();
  return (
    <main className="flex h-screen">
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
