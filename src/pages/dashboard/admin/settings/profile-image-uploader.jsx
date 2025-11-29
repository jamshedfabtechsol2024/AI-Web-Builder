import { Camera, Edit } from "lucide-react"; // <-- Lucide icons
import { useEffect, useState } from "react";

const ProfileImageUploader = ({ onFileSelect, defaultImage }) => {
  const [image, setImage] = useState(defaultImage || null);

  // Update state if defaultImage changes dynamically
  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    }
  }, [defaultImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-32 w-32">
        {/* Circle with image or gray background */}
        <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-800">
          {image && (
            <img
              alt="Profile"
              className="h-full w-full object-cover"
              src={image}
            />
          )}
        </div>

        {/* Icon button positioned at bottom-right */}
        <label
          className="absolute right-0 bottom-2 cursor-pointer rounded-full border border-black bg-white p-1 shadow hover:bg-gray-100"
          htmlFor="file-upload"
        >
          {image ? (
            <Edit className="text-gray-700" size={20} />
          ) : (
            <Camera className="text-gray-700" size={20} />
          )}
        </label>

        {/* Hidden input */}
        <input
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={handleImageChange}
          type="file"
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
