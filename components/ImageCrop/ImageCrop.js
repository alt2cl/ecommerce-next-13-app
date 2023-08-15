// components/CloudinaryImage.js
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const CloudinaryImage = ({ publicId, alt }) => {
  const cloudName = "dn5bsevc9"; // Reemplaza con tu Cloud Name
  const cl = new Cloudinary({ cloud: { cloudName } });

  return (
    <div>
      <AdvancedImage cldImg={cl.image(publicId)} alt={alt} />
    </div>
  );
};

export default CloudinaryImage;
