import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoryDetail.css";
import { WebStory } from "@google/web-stories";

const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/story/fetchonestory/${id}`)
            .then((res) => {
                console.log("Story Data:", res.data);
                setStory(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!story) return <p className="loading-text">Loading...</p>;
    console.log(story);
    return (
        <div className="story-container">
            <amp-story 
                standalone 
                title={story.title} 
                publisher="My Website" 
                poster-portrait-src={story.pages[0]?.media_url}
            >
              {story.pages?.length > 0 ? (
                
    story.pages.map((page) => (
        <amp-story-page key={page.id} id={`page-${page.id}`}>
            <amp-story-grid-layer template="fill">
                {page.media_type === "0" ? (
                    <amp-img 
                        src={page.media_url} 
                        width="720" 
                        height="1280" 
                        layout="responsive"
                    ></amp-img>
                ) : (
                    <amp-video 
                        src={page.media_url} 
                        width="720" 
                        height="1280" 
                        layout="responsive" 
                        autoplay
                    ></amp-video>
                )}
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
                <p className="story-content">{page.content}</p>
            </amp-story-grid-layer>
        </amp-story-page>
    ))
) : (
    <p className="no-pages">No pages available.</p>
)}

            </amp-story>
        </div>
    );
};

export default StoryDetail;
