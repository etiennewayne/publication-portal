export interface User {
	role: string;
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

export interface Article {
	data(data: any): unknown;
    article_id: number;
    title: string;
    article_content: string,
    author: string,
    encoded_by: string;
    modified_by: string;
    date_published: string;
    is_published: number;
    is_featured: number;
    views: number;
}

// cateogires
export interface Category {
	data(data: any): unknown;
    category_id: number;
    category: string;
    active: number;
   
}
