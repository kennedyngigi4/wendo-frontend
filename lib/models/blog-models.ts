export interface BlogHomeModel{
    id: string
    slug: string
    title: string
    exerpt: string
    published_at: string
    image: string
    author: string
}


export interface BlogDetailsModel {
    id: string;
    title: string;
    slug: string;
    image: string;
    exerpt: string;
    content: string;
    tags: any[];
    date_published: string
    description: string

    
    published_at: string;
    category?: {
        name: string;
    };
    author?: string
}

