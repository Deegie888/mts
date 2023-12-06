'use client';

import Link from "next/link";

export default function Login () {
    return (
        <div className="absolute w-full h-full flex justify-center items-center">
            <div className="w-full md:w-1/3 border border-gray-600 p-6 rounded-lg text-gray-400 space-y-2">
                <p className="text-center font-bold text-gray-400">Login</p>
                <div className="group">
                    <label className="text-xs font-bold group-hover:text-white group-hover:border-white">Email</label>
                    <input 
                        type="text"
                        className="w-full p-2 rounded-lg border border-gray-600 group-hover:text-white group-hover:border-white bg-slate-900/10"
                    />
                </div>
                <div className="group">
                    <label className="text-xs font-bold group-hover:text-white group-hover:border-white">Password</label>
                    <input 
                        type="text"
                        className="w-full p-2 rounded-lg border border-gray-600 group-hover:text-white group-hover:border-white bg-slate-900/10"
                    />
                </div>
                <div className="flex space-x-2">
                    <button
                        className="w-full md:w-1/2 p-2 rounded-lg border border-gray-600 hover:text-white hover:border-white hover:font-bold"
                    >
                        login
                    </button>
                    <Link
                        href={'/classroom/register'}
                        className="block text-center w-full md:w-1/2 p-2 rounded-lg border border-gray-600 hover:text-white hover:border-white hover:font-bold"
                    >
                        register
                    </Link>
                </div>
            </div>
        </div>
    )
}