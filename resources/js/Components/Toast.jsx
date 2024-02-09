import React from 'react';

export default function Toast({message, onClose}) {
    return (
        <div className="absolute top-30 left-0 right-0 m-auto flex items-center w-full max-w-xs p-4 rounded-lg dark:text-gray-400 dark:bg-gray-800">
            <div className="text-sm flex-1">{message}</div>
            <button onClick={() => onClose()}>X</button>
        </div>
    );
}