export type TCategory = {
    id: string;
    categoryName: string;
};

export type TPost = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    puplicId?: string;
    categoryName?: string;
    links: null | string[];
    createdAt: string;
    authorEmail: string;
    authorName: {
        name: string;
    };
};

