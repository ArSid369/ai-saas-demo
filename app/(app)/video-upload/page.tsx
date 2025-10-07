"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();

  //max file size is 70mb
  const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB in bytes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.success('Please select a file to upload.');
      return;
    }

    if(file.size > MAX_FILE_SIZE) {
      toast.success('File size exceeds the 70MB limit.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData);
      if (response.status !== 200) throw new Error('Failed to upload video');
      toast.success('Video uploaded successfully!');
    } catch (error) {
      console.log('Error uploading video:', error);
      toast.error('Error uploading video. Please try again.');
    } finally {
      setIsUploading(false);
    }

  }


      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      );
}

export default VideoUpload