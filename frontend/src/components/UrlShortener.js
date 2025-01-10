import React, { useState } from "react";
import axios from "axios";

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:8099/urls/shorten", { url: originalUrl });
            setShortUrl(response.data.short_code);
        } catch (err) {
            setError("Failed to shorten the URL");
        }
    };

    return (
        <div>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <button type="submit">Shorten</button>
            </form>
            {shortUrl && (
                <p>
                    Short URL: <a href={`http://localhost:8099/urls/${shortUrl}`} target="_blank">{`http://localhost:8099/urls/${shortUrl}`}</a>
                </p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default UrlShortener;