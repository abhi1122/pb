import React from 'react';
import { Image } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';

const cloudinaryCore = new Cloudinary({ cloud_name: 'dp536vvok' });

export const CloudImage = ({ publicId, width, height, className }) => {
  // return (
  //   <Image
  //     cloudName='dp536vvok'
  //     publicId={publicId}
  //     width={width}
  //     height={height}
  //     crop='scale'
  //     loading='lazy'
  //   />
  // );
  return (
    <img
      src={cloudinaryCore.url(publicId)}
      width={width}
      height={height}
      className={className}
    />
  );
};
