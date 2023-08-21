"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Task } from "@/lib/types";
import {
  getAllTasks,
  createTask,
  completeTask,
  removeTask,
  clearTasks,
} from "@/lib/todo";
import { useSession } from "next-auth/react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session) {
        const data = await getAllTasks();
        setTasks(data);
      }
    })();
  }, [session]);

  const onCreate = async () => {
    const data = await createTask(title);
    setTasks(data);
    setTitle("");
  };

  const onComplete = async (task: Task) => {
    const data = await completeTask(task.id);
    setTasks(data);
  };

  const onDelete = async (task: Task) => {
    const data = await removeTask(task.id);
    setTasks(data);
  };

  const onClear = async () => {
    const data = await clearTasks();
    setTasks(data);
  };

  return (
    <main className="flex h-screen">
      <div className={`m-auto`}>
        <div
          className={`w-[350px] shadow-xl p-5 min-h-[500px] border border-stone-200 rounded-lg`}
        >
          <div className={`flex flex-row mb-5`}>
            <input
              className={`basis-3/5 border rounded border-stone-200 mr-2 px-3 outline-none shadow-sm text-sm focus:border-stone-300 text-stone-500`}
              value={title}
              placeholder="Task name..."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <button
              className={`basis-2/5 rounded bg-sky-300 text-white px-1 py-2 text-sm hover:bg-sky-400 border border-sky-400 disabled:cursor-not-allowed`}
              onClick={onCreate}
              disabled={title.length === 0}
            >
              Create
            </button>
          </div>

          <ul
            className={`h-[380px] rounded-lg border p-[2px] border-stone-100 ${
              tasks.length >= 8 && "overflow-y-scroll pr-2"
            }`}
          >
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex p-3 rounded-lg mt-1 justify-between hover:bg-stone-50 cursor-pointer border border-stone-100 first:mt-0`}
              >
                <div
                  className={`lowercase text-sm text-stone-600 ${
                    task.completed && "line-through italic"
                  }`}
                  onClick={() => onComplete(task)}
                >
                  {task.title}
                </div>
                <button
                  className={`text-red-500 hover:text-red-600`}
                  onClick={() => onDelete(task)}
                >
                  <TrashIcon className={`w-[18px]`} />
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`py-3 border-t-stone-100 border-t mt-5 flex justify-between`}
          >
            <button
              className={`rounded bg-pink-400 text-white px-3 py-2 text-sm hover:bg-pink-500`}
              onClick={onClear}
            >
              Clear
            </button>
            <p className={`text-sm text-stone-400 pt-3 px-2`}>
              {tasks.length} Tasks
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
