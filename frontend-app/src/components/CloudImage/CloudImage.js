import React from "react";
import { Image } from "cloudinary-react";

export const CloudImage = ({ publicId, width, height }) => {
  return (
    <Image
      cloudName="dp536vvok"
      publicId={publicId}
      width={width}
      height={height}
      crop="scale"
      loading="lazy"
    />
  );
};
