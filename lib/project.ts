"use server";

import { revalidatePath } from "next/cache";
import { instance } from "./instance";
import { getUser } from "./utils";

export async function createProject(name: string) {
  const user = await getUser();
  const data = {
    email: user?.email,
    name,
  };
  const res = await instance.post("/project", data);
  revalidatePath("/projects");
  return res.data;
}

export async function getProjects() {
  const user = await getUser();
  const res = await instance.get(`/project?email=${user?.email}`);
  return res.data;
}

export async function getProject(id: string) {
  const res = await instance.get(`/project/${id}`);
  return res.data;
}

export async function updateProject(id: string, name: string) {
  const res = await instance.patch(`/project/${id}`, { name });
  revalidatePath(`/projects/${id}/setting`);
  return res.data;
}
export async function deleteProject(id: string) {
  const res = await instance.delete(`/project/${id}`);
  revalidatePath("/projects");
  return res.data;
}
