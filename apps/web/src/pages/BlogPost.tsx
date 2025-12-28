import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SEOHead } from '../components/seo/SEOHead';
import { getBlogPost, type BlogPost as BlogPostType } from '../services/mockBlog';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost: React.FC = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        if (!postId) {
            setLoading(false);
            return () => {
                active = false;
            };
        }
        getBlogPost(postId)
            .then(data => {
                if (active) setPost(data);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [postId]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
                    Cargando artículo...
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
                    <p className="text-gray-600 mb-6">Este artículo no está disponible o fue eliminado.</p>
                    <Link to="/blog" className="text-blue-600 font-semibold hover:underline">
                        Volver al blog
                    </Link>
                </div>
            </Layout>
        );
    }

    const formattedDate = (() => {
        const timestamp = new Date(post.date).getTime();
        if (Number.isNaN(timestamp)) return post.date;
        return new Date(post.date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    })();

    return (
        <Layout>
            <SEOHead title={post.title} description={post.excerpt} image={post.imageUrl} type="article" />
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver al blog
                </Link>

                <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formattedDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {post.category}
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {post.title}
                </h1>

                {post.imageUrl && (
                    <div className="mb-8 rounded-2xl overflow-hidden bg-gray-100">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                </div>
            </div>
        </Layout>
    );
};

export default BlogPost;
