"use server";
import { revalidatePath } from "next/cache";
import { instance } from "./instance";

export async function getTasks(projectId: string) {
  const res = await instance.get(`/task?projectId=${projectId}`);
  return res.data;
}

export async function createTask(title: string, projectId: string) {
  const data = {
    title,
    projectId,
  };
  const res = await instance.post("/task", data);
  revalidatePath(`/project/${projectId}/tasks`);
  return res.data;
}

export async function deleteTask(id: string) {
  const res = await instance.delete(`/task/${id}`);
  return res.data;
}

export async function changeTaskStatus(id: string, status: string) {
  const res = await instance.patch(`/task/${id}`, { status });
  return res.data;
}

export async function changeTaskName(id: string, title: string) {
  const res = await instance.patch(`/task/${id}`, { title });
  return res.data;
}
