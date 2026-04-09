// frontend/src/services/api.ts

const API_BASE_URL = 'http://localhost:8000/api';

export interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Result {
    id: number;
    name: string;
    session: string;
    time: string;
    score: string;
    doc: string;
}

export interface CreateResultData {
    trainee_name: string;
    session_title: string;
    score: string;
    time: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
}

class ApiClient {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return response.json();
    }

    async getTasks(): Promise<Task[]> {
        return this.request<Task[]>('/tasks');
    }

    async getTask(id: number): Promise<Task> {
        return this.request<Task>(`/tasks/${id}`);
    }

    async getResults(search?: string): Promise<Result[]> {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        return this.request<Result[]>(`/results${query}`);
    }

    async saveResult(data: CreateResultData): Promise<Result> {
        return this.request<Result>('/results', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    // Добавьте в класс ApiClient
async saveTrainee(fio: string, title: string): Promise<any> {
    return this.request<any>('/trainees', {
        method: 'POST',
        body: JSON.stringify({ fio, title }),
    });
}
async createTask(data: { title: string; description: string }): Promise<Task> {
    return this.request<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
// Добавьте в класс ApiClient
async updateTask(id: number, data: { title: string; description: string }): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

async deleteTask(id: number): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
        method: 'DELETE',
    });
}

    // Teacher login method
    async teacherLogin(password: string): Promise<LoginResponse> {
        return this.request<LoginResponse>('/teacher/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });
    }
}

export const api = new ApiClient();