import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import React from 'react';

const CreateCategories = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Categories</h1>
                    <p className="text-gray-500 text-sm">Manage your transaction categories</p>
                </div>
                <Button variant="primary" className="rounded-xl">
                    <Plus size={20} />
                    Add Category
                </Button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                {/* Your Categories Management UI goes here */}
                <p className="text-gray-600">Category management interface will be here.</p>
            </div>
        </div>
    );
};

export default CreateCategories;
