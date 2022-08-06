import React from 'react'

export default function Button({ children, onClick, className, variant = null }) {
    return (
        <button
            onClick={onClick}
            className={`${variant === "danger" ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 border-blue-600 active:border-blue-700 hover:bg-blue-700"} ${className} text-white px-3 py-2 border rounded transition duration-150 ease-in-out`}
        >
            {children}
        </button>
    )
}
