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
    active: boolean
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        csrf_token: string;
    };
    
};

export interface Article {
	data(data: any): unknown;
    article_id: number;
    title: string;
    article_content: string,
    author: string,
    category_id: number;
    encoded_by: string;
    modified_by: string;
    date_published: string;
    featured_image: string;
    featured_image_caption: string;
    status: string;
    is_featured: number;
    views: number;
}

// cateogires
export interface Category {
	data(data: any): unknown;
    category_id: number;
    category: string;
    active: boolean;
   
}


//statuses
export interface Status {
	// map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
	data(data: any): unknown;
    status_id: number;
    status: string;
    active: boolean;
}
