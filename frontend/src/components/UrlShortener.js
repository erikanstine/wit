import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`http://localhost:8099/urls/${shortUrl}`);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidUrl(originalUrl)) {
            setError("Please enter a valid URL");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:8099/urls/shorten", { url: originalUrl });
            setShortUrl(response.data.short_code);
        } catch (err) {
            setError("Failed to shorten the URL");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold">Wit URL Shortener</h1>
            </header>
            <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            className="flex-1 border border-gray-300 rounded p-2"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        >
                            {loading ? "Loading..." : "Shorten"}
                        </button>
                    </div>
                </form>
                {loading && <Spinner />}
                {shortUrl && (
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-gray-700">
                            Short URL: <a href={`http://localhost:8099/urls/${shortUrl}`} className="text-blue-500 underline">{`http://localhost:8099/urls/${shortUrl}`}</a>
                        </p>
                        <button 
                            type="button"
                            onClick={copyToClipboard}
                            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                            Copy
                        </button>
                    </div>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default UrlShortener;