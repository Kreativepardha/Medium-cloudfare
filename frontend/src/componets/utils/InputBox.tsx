import React, { ChangeEvent } from "react";

interface InputBoxProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}


export const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, onChange, type }) => {
    return <div className="capitalize">
        <label className="block mb-2 text-slate-600 font-semibold pt-4">{label}</label>
        <input
            type={type || "text"}
            placeholder={placeholder}
            onChange={onChange}
            className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-200 focus:border-blue-200 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-200 dark:text-blue-100
                p-2
            dark:focus:ring-blue-600 dark:focus:border-blue-600"
        />
    </div>
}
