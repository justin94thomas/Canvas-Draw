import React, { ChangeEvent } from 'react';
import { FaUpload } from 'react-icons/fa';
import '../App.css';

interface ImageUploadProps {
    onImageUpload: (imageURL: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageURL = URL.createObjectURL(event.target.files[0]);
            onImageUpload(imageURL);
        }
    }

    return (
        <>
            <div className="upload-screen">
                <div className="upload-container">
                    <label htmlFor="file-upload" className="upload-label">
                        <FaUpload className="upload-icon" />
                    </label>
                    <input
                        type='file'
                        accept='image/*'
                        id="file-upload"
                        className="file-input"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>

        </>
    )
}

export default ImageUpload;