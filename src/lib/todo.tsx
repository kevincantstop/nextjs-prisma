"use server";

import { prisma } from "@/lib/db";

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany();
  return Promise.resolve(tasks);
};

const createTask = async (title: string) => {
  await prisma.task.create({
    data: {
      title,
      completed: false,
    },
  });
  return getAllTasks();
};

const completeTask = async (id: string) => {
  await prisma.task.update({
    where: { id },
    data: { completed: true },
  });
  return getAllTasks();
};

const removeTask = async (id: string) => {
  await prisma.task.delete({
    where: { id },
  });
  return getAllTasks();
};

const clearTasks = async () => {
  await prisma.task.deleteMany({});
  return getAllTasks();
};

export { getAllTasks, createTask, completeTask, removeTask, clearTasks };
