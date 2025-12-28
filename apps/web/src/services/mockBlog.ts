
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Markdown or HTML
    author: string;
    date: string;
    imageUrl?: string;
    category: string;
}

const STORAGE_KEY = 'unistudy_blog_posts';

export const MOCK_POSTS: BlogPost[] = [
    {
        id: '1',
        title: '5 Herramientas de IA para Estudiantes en 2024',
        excerpt: 'Descubre cómo maximizar tu productividad con estas herramientas.',
        content: 'La inteligencia artificial ha revolucionado la forma en que estudiamos...',
        author: 'Admin',
        date: '2024-05-15',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        category: 'Tips'
    },
    {
        id: '2',
        title: 'Guía de Diseño para No Diseñadores',
        excerpt: 'Principios básicos para crear diapositivas impactantes.',
        content: 'No necesitas ser un experto para que tus presentaciones se vean profesionales...',
        author: 'Admin',
        date: '2024-05-20',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799314346d',
        category: 'Diseño'
    }
];

export const getBlogPosts = (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return MOCK_POSTS;
};

export const createBlogPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const posts = getBlogPosts();
    const newPost: BlogPost = {
        ...post,
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
};

export const updateBlogPost = (
    postId: string,
    updates: Partial<Omit<BlogPost, 'id' | 'date'>>
) => {
    const posts = getBlogPosts();
    const nextPosts = posts.map(post => (
        post.id === postId ? { ...post, ...updates } : post
    ));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));
    return nextPosts;
};
