import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StoryList.css"; // Importing external CSS

const StoryList = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/story/list-story")
            .then((res) => setStories(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="story-list-container">
            <h2 className="story-list-title">Web Stories</h2>

            <div className="story-grid">
                {stories.map((story) => (
                    <div key={story.id} className="story-card">
                        <a href={`/story/${story.id}`} className="story-link">
                            <img src={story.pages[0]?.media_url} alt={story.title} className="story-image" />
                            <div className="story-overlay">
                                <h3 className="story-title">{story.title}</h3>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoryList;
