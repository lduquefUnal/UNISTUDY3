import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { getSeoGlobal, getSeoPages, saveSeoGlobal, saveSeoPages, type SeoGlobalConfig, type SeoPageConfig } from '../../services/mockSeo';
import { Save, Globe, FileText, Search, RefreshCw } from 'lucide-react';

export const AdminSEO: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'global' | 'pages'>('global');
    const [globalConfig, setGlobalConfig] = useState<SeoGlobalConfig | null>(null);
    const [pagesConfig, setPagesConfig] = useState<SeoPageConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setGlobalConfig(getSeoGlobal());
        setPagesConfig(getSeoPages());
        setLoading(false);
    }, []);

    const handleGlobalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!globalConfig) return;
        setGlobalConfig({ ...globalConfig, [e.target.name]: e.target.value });
    };

    const handlePageChange = (index: number, field: keyof SeoPageConfig, value: string | boolean) => {
        const newPages = [...pagesConfig];
        newPages[index] = { ...newPages[index], [field]: value };
        setPagesConfig(newPages);
    };

    const handleSave = () => {
        if (globalConfig) saveSeoGlobal(globalConfig);
        saveSeoPages(pagesConfig);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (loading || !globalConfig) return <div>Cargando...</div>;

    const SERPPreview = ({ title, description, url }: { title: string, description: string, url: string }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 font-sans max-w-xl">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {url}
            </div>
            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 truncate">
                {title}
            </div>
            <div className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {description}
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Search className="w-8 h-8 text-blue-500" />
                        Gestor SEO & Metadatos
                    </h1>
                    <p className="text-gray-500">Optimiza cómo aparece Unistudy en Google y redes sociales.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                </button>
            </div>

            {saved && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Cambios aplicados y guardados.
                </div>
            )}

            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('global')}
                    className={`px-4 py-2 font-medium border-b-2 transition ${activeTab === 'global' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Configuración Global
                </button>
                <button
                    onClick={() => setActiveTab('pages')}
                    className={`px-4 py-2 font-medium border-b-2 transition ${activeTab === 'pages' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Páginas Individuales
                </button>
            </div>

            {activeTab === 'global' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Defaults del Sitio</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Sitio</label>
                            <input name="siteName" value={globalConfig.siteName} onChange={handleGlobalChange} className="w-full border p-2 rounded" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título Por Defecto</label>
                            <input name="defaultTitle" value={globalConfig.defaultTitle} onChange={handleGlobalChange} className="w-full border p-2 rounded" />
                            <p className="text-xs text-gray-400 mt-1">{globalConfig.defaultTitle.length} caracteres (Recomendado: 50-60)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Por Defecto</label>
                            <textarea name="defaultDescription" value={globalConfig.defaultDescription} onChange={handleGlobalChange} rows={3} className="w-full border p-2 rounded" />
                            <p className="text-xs text-gray-400 mt-1">{globalConfig.defaultDescription.length} caracteres (Recomendado: 150-160)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen OpenGraph (URL)</label>
                            <input name="ogImageUrl" value={globalConfig.ogImageUrl} onChange={handleGlobalChange} className="w-full border p-2 rounded text-sm font-mono text-gray-600" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">Vista Previa (Google)</h3>
                        <SERPPreview
                            title={globalConfig.defaultTitle}
                            description={globalConfig.defaultDescription}
                            url={globalConfig.baseUrl}
                        />

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                            <strong>Nota:</strong> Estos valores se usarán en cualquier página que no tenga una configuración específica.
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'pages' && (
                <div className="space-y-8">
                    {pagesConfig.map((page, index) => (
                        <div key={page.path} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" />
                                {page.path}
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                        <input
                                            value={page.title}
                                            onChange={(e) => handlePageChange(index, 'title', e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                        <textarea
                                            value={page.description}
                                            onChange={(e) => handlePageChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={page.noindex || false}
                                            onChange={(e) => handlePageChange(index, 'noindex', e.target.checked)}
                                            id={`noindex-${index}`}
                                        />
                                        <label htmlFor={`noindex-${index}`} className="text-sm text-red-600 font-medium select-none cursor-pointer">
                                            No Indexar (Ocultar de Google)
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Vista Previa</h4>
                                    <SERPPreview
                                        title={page.title}
                                        description={page.description}
                                        url={`${globalConfig.baseUrl}${page.path}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminSEO;
