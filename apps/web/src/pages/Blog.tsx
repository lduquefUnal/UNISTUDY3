import { useEffect, useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Layout } from '../components/layout/Layout';
import { getBlogPosts, type BlogPost } from '../services/mockBlog';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    useEffect(() => {
        setPosts(getBlogPosts());
    }, []);

    return (
        <Layout>
            <SEOHead />
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Novedades</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Consejos, trucos y guías sobre Inteligencia Artificial y herramientas digitales para estudiantes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col h-full border border-gray-100">
                                <div className="h-48 overflow-hidden bg-gray-200 relative group">
                                    {post.imageUrl ? (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Imagen</div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</div>
                                        <div className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</div>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 md:line-clamp-none">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                                    >
                                        Leer más <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blog;
