import React from "react";
import { ImagePlus } from 'lucide-react';

/**
 * This function `ChangeAdCreativeImage` is a React component that triggers a file upload dialog when a
 * file link is clicked.
 */
const ChangeAdCreativeImage = ({ onImageChange }) => {
    const handleFileLinkClick = () => {
    document.getElementById("file-upload").click();
  };

  
/**
 * The `handleFileChange` function takes an event object, retrieves the selected file, creates a URL
 * for the file, and then calls the `onImageChange` function with the URL as a parameter.
 */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      onImageChange(imageUrl);
    }
  };
  

  return (
    <div>
      <p className="text-gray-400 text-sm item-center font-poppins">
        <ImagePlus name="upload" strokeWidth={2} color="#4461f2" className="inline-block mr-2" />
        Change the ad creative image.{" "}
        <button className="text-blue-500 underline" onClick={handleFileLinkClick}>select file</button>
        <input
         id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </p>
    </div>
  );
};

export default ChangeAdCreativeImage;
