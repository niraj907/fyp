import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500">This page is under construction.</p>
        </div>
    );
};

export default PlaceholderPage;
