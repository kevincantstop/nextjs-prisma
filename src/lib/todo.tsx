"use server";

import { prisma } from "@/lib/db";

const getAllTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });
  return Promise.resolve(tasks);
};

const createTask = async (title: string, userId: string) => {
  await prisma.task.create({
    data: {
      title,
      completed: false,
      user: { connect: { id: userId } },
    },
  });
  return getAllTasks(userId);
};

const completeTask = async (id: string, userId: string) => {
  await prisma.task.update({
    where: { id },
    data: { completed: true, user: { connect: { id: userId } } },
  });
  return getAllTasks(userId);
};

const removeTask = async (id: string, userId: string) => {
  await prisma.task.delete({
    where: { id },
  });
  return getAllTasks(userId);
};

const clearTasks = async (userId: string) => {
  await prisma.task.deleteMany({});
  return getAllTasks(userId);
};

export { getAllTasks, createTask, completeTask, removeTask, clearTasks };
