import React from 'react';
import { Layout } from '../components/layout/Layout';

const Debug: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">Debug Info</h1>
                <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm overflow-auto">
                    <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
                    <p><strong>API Mode:</strong> {import.meta.env.VITE_API_MODE || 'undefined'}</p>
                    <p><strong>Base URL:</strong> {import.meta.env.BASE_URL}</p>
                </div>
            </div>
        </Layout>
    );
};

export default Debug;
