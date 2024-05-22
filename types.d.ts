export interface ResponseFromServer {
  message: string;
  status: number;
  id?: string;
  content: {
    projects: Project[];
    project: ProjectDetail;
    tasks: Task[];
  };
}

export interface Project {
  id: string;
  name: string;
  status: string;
  createdTime: string;
  updatedTime: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
  };
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdTime: string;
  updatedTime: string;
}
