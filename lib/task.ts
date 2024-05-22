"use server";
import { revalidatePath } from "next/cache";
import { instance } from "./instance";

export async function getTasks(projectId: string) {
  const res = await instance.get(`/task?projectId=${projectId}`);
  return res.data;
}

export async function createTask(name: string, projectId: string) {
  const data = {
    name,
    projectId,
  };
  const res = await instance.post("/task", data);
  revalidatePath(`/project/${projectId}/tasks`);
  return res.data;
}
