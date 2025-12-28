import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { createBlogPost, getBlogPosts, updateBlogPost, type BlogPost } from '../../services/mockBlog';
import { Plus } from 'lucide-react';

type BlogFormState = {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
};

const EMPTY_FORM: BlogFormState = {
    title: '',
    excerpt: '',
    content: '',
    category: 'Tips',
    imageUrl: ''
};

const AdminBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [formState, setFormState] = useState<BlogFormState>(EMPTY_FORM);

    useEffect(() => {
        setPosts(getBlogPosts());
    }, []);

    const openCreate = () => {
        setActivePostId('new');
        setFormState(EMPTY_FORM);
    };

    const openEdit = (post: BlogPost) => {
        setActivePostId(post.id);
        setFormState({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            imageUrl: post.imageUrl ?? ''
        });
    };

    const closeForm = () => {
        setActivePostId(null);
        setFormState(EMPTY_FORM);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activePostId === 'new') {
            const post = createBlogPost({
                ...formState,
                author: 'Admin',
                imageUrl: formState.imageUrl || undefined
            });
            setPosts([post, ...posts]);
        } else if (activePostId) {
            const nextPosts = updateBlogPost(activePostId, {
                title: formState.title,
                excerpt: formState.excerpt,
                content: formState.content,
                category: formState.category,
                imageUrl: formState.imageUrl || undefined
            });
            setPosts(nextPosts);
        }

        closeForm();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setFormState(prev => ({ ...prev, imageUrl: String(reader.result) }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestión del Blog</h1>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" /> Nuevo Post
                </button>
            </div>

            {activePostId && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-lg font-bold mb-4">
                        {activePostId === 'new' ? 'Crear Nueva Entrada' : 'Editar Entrada'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formState.title}
                                onChange={e => setFormState({ ...formState, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    value={formState.category}
                                    onChange={e => setFormState({ ...formState, category: e.target.value })}
                                >
                                    <option>Tips</option>
                                    <option>Noticias</option>
                                    <option>Tutoriales</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resumen (Excerpt)</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    value={formState.excerpt}
                                    onChange={e => setFormState({ ...formState, excerpt: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner del artículo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                required={activePostId === 'new' && !formState.imageUrl}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Se usa como imagen principal del articulo en el agregador.
                            </p>
                            {formState.imageUrl && (
                                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32">
                                    <img
                                        src={formState.imageUrl}
                                        alt="Vista previa del banner"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formState.content}
                                onChange={e => setFormState({ ...formState, content: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeForm}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                {activePostId === 'new' ? 'Publicar' : 'Guardar cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Título</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map(post => (
                            <tr key={post.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{post.category}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => openEdit(post)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminBlog;
