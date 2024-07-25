export interface User {
	role: any;
	data(data: any): unknown;
    id: number;
    user_id: number;
    username: string,
    sex: string,
    name: string;
    email: string;
    email_verified_at: string;
    active: number
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
