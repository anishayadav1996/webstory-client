import React, { useState } from "react";
import axios from "axios";

const AddStory = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pages, setPages] = useState([{ content: "", media_url: "", media_type: "0" }]);

    const addPage = () => {
        setPages([...pages, { content: "", media_url: "", media_type: "0" }]);
    };

    const handlePageChange = (index, key, value) => {
        const newPages = [...pages];
        newPages[index][key] = value;
        setPages(newPages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/story/addstory", {
                title,
                description,
                pages,
            });
            alert(response.data.message);
            setTitle("");
            setDescription("");
            setPages([{ content: "", media_url: "", media_type: "0" }]);
        } catch (error) {
            console.error("Error inserting story:", error);
        }
    };

    return (
        <div>
            <h2>Add New Story</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Story Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <h3>Pages</h3>
                {pages.map((page, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Page Content" value={page.content} onChange={(e) => handlePageChange(index, "content", e.target.value)} required />
                        <input type="text" placeholder="Media URL" value={page.media_url} onChange={(e) => handlePageChange(index, "media_url", e.target.value)} required />
                        <select value={page.media_type} onChange={(e) => handlePageChange(index, "media_type", e.target.value)}>
                            <option value="0">Image</option>
                            <option value="1">Video</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={addPage}>Add Page</button>
                <button type="submit">Create Story</button>
            </form>
        </div>
    );
};

export default AddStory;

