"use client";

import { IGetCategories } from "@/types/catalogs";
import { useRef, useState, useEffect } from "react";

export default function ImageUploadForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [categories, setCategories] = useState<IGetCategories[]>([]);

    useEffect(() => {

        async function fetchCategories() {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        }

        fetchCategories()
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputRef.current?.files || !inputRef.current.files[0]) {
            alert("Please select an image");
            return;
        }

        const file = inputRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("categoryId", categoryId.toString());

        try {
            const res = await fetch("/api/image", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            alert(data.message || data.error);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-xl shadow"
        >
            <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col items-start">
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Image file
                </label>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFileChange}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
                {fileName && (
                    <p className="text-sm text-gray-600 mt-1">Selected: {fileName}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Upload
            </button>
        </form>
    );
}
