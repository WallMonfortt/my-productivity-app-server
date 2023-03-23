export interface Task {
    taskId: string;
    userId: string;
    title: string;
    description: string;
    projectId: string;
    priority: string;
    dueDate: Date;
    reminder: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}