// components/ImageUploader.jsx
"use client";

import { useState } from "react";

export default function ImageUploader() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");

    function onFileChange(e) {
        const f = e.target.files?.[0];
        setUploadedUrl("");
        if (f) {
            setFile(f);
            setPreview(URL.createObjectURL(f)); // for instant preview
        } else {
            setFile(null);
            setPreview("");
        }
    }

    async function onUpload(e) {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        try {
            const form = new FormData();
            form.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Upload failed");

            setUploadedUrl(data.url);
        } catch (err) {
            alert(err.message || "Something went wrong");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div style={{ maxWidth: 480, margin: "24px auto", fontFamily: "sans-serif" }}>
            <h2 style={{ marginBottom: 12 }}>Upload an image to Cloudinary</h2>

            <form onSubmit={onUpload}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ marginBottom: 12 }}
                />

                {preview && (
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 12, marginBottom: 6, opacity: 0.8 }}>
                            Preview (local, before upload):
                        </div>
                        <img
                            src={preview}
                            alt="preview"
                            style={{ maxWidth: "100%", borderRadius: 8 }}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || uploading}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        cursor: uploading ? "not-allowed" : "pointer",
                    }}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {uploadedUrl && (
                <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, marginBottom: 6, opacity: 0.8 }}>
                        Uploaded to Cloudinary:
                    </div>
                    <img
                        src={uploadedUrl}
                        alt="uploaded"
                        style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                    <p style={{ fontSize: 12, wordBreak: "break-all" }}>{uploadedUrl}</p>
                </div>
            )}
        </div>
    );
}
