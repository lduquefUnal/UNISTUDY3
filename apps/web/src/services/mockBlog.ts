
import { graphqlRequest } from './appsyncClient';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Markdown or HTML
    author: string;
    date: string;
    imageUrl?: string;
    category: string;
    published?: boolean;
}

type ApiBlogPost = {
    postId: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    imageUrl?: string | null;
    category: string;
    published?: boolean | null;
};

type ListBlogPostsResponse = { listBlogPosts: ApiBlogPost[] };
type GetBlogPostResponse = { getBlogPost: ApiBlogPost | null };
type CreateBlogPostResponse = { createBlogPost: ApiBlogPost };
type UpdateBlogPostResponse = { updateBlogPost: ApiBlogPost };

const LIST_BLOG_POSTS_QUERY = /* GraphQL */ `
  query ListBlogPosts {
    listBlogPosts {
      postId
      title
      excerpt
      content
      author
      date
      imageUrl
      category
      published
    }
  }
`;

const GET_BLOG_POST_QUERY = /* GraphQL */ `
  query GetBlogPost($postId: ID!) {
    getBlogPost(postId: $postId) {
      postId
      title
      excerpt
      content
      author
      date
      imageUrl
      category
      published
    }
  }
`;

const CREATE_BLOG_POST_MUTATION = /* GraphQL */ `
  mutation CreateBlogPost($input: CreateBlogPostInput!) {
    createBlogPost(input: $input) {
      postId
      title
      excerpt
      content
      author
      date
      imageUrl
      category
      published
    }
  }
`;

const UPDATE_BLOG_POST_MUTATION = /* GraphQL */ `
  mutation UpdateBlogPost($postId: ID!, $input: UpdateBlogPostInput!) {
    updateBlogPost(postId: $postId, input: $input) {
      postId
      title
      excerpt
      content
      author
      date
      imageUrl
      category
      published
    }
  }
`;

const STORAGE_KEY = 'unistudy_blog_posts';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

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

const loadFromStorage = (): BlogPost[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_POSTS;
};

const saveToStorage = (posts: BlogPost[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

const mapPost = (post: ApiBlogPost): BlogPost => ({
    id: post.postId,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    imageUrl: post.imageUrl ?? undefined,
    category: post.category,
    published: post.published ?? undefined
});

export const listBlogPosts = async (): Promise<BlogPost[]> => {
    if (!USE_LIVE_API) {
        return loadFromStorage();
    }

    try {
        const data = await graphqlRequest<ListBlogPostsResponse>(LIST_BLOG_POSTS_QUERY);
        const posts = data.listBlogPosts.map(mapPost);
        saveToStorage(posts);
        return posts;
    } catch (error) {
        console.error('Error loading blog posts from AppSync:', error);
        return loadFromStorage();
    }
};

export const getBlogPost = async (postId: string): Promise<BlogPost | null> => {
    if (!USE_LIVE_API) {
        return loadFromStorage().find(post => post.id === postId) || null;
    }

    const data = await graphqlRequest<GetBlogPostResponse>(GET_BLOG_POST_QUERY, { postId });
    return data.getBlogPost ? mapPost(data.getBlogPost) : null;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    if (!USE_LIVE_API) {
        const posts = loadFromStorage();
        const newPost: BlogPost = {
            ...post,
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0]
        };
        const nextPosts = [newPost, ...posts];
        saveToStorage(nextPosts);
        return newPost;
    }

    const data = await graphqlRequest<CreateBlogPostResponse>(CREATE_BLOG_POST_MUTATION, {
        input: {
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            imageUrl: post.imageUrl,
            category: post.category,
            published: post.published ?? true
        }
    });

    return mapPost(data.createBlogPost);
};

export const updateBlogPost = async (
    postId: string,
    updates: Partial<Omit<BlogPost, 'id' | 'date'>>
) => {
    if (!USE_LIVE_API) {
        const posts = loadFromStorage();
        const nextPosts = posts.map(post => (
            post.id === postId ? { ...post, ...updates } : post
        ));
        saveToStorage(nextPosts);
        return nextPosts.find(post => post.id === postId) || null;
    }

    const data = await graphqlRequest<UpdateBlogPostResponse>(UPDATE_BLOG_POST_MUTATION, {
        postId,
        input: {
            title: updates.title,
            excerpt: updates.excerpt,
            content: updates.content,
            author: updates.author,
            imageUrl: updates.imageUrl,
            category: updates.category,
            published: updates.published
        }
    });

    return mapPost(data.updateBlogPost);
};
