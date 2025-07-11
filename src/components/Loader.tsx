"use client";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl py-6 px-10 shadow-lg flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-black font-medium text-lg">Loading</p>
            </div>
        </div>
    );
}