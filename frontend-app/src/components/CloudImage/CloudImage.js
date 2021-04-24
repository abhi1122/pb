import React from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';

//const cloudinaryCore = new Cloudinary({ cloud_name: 'dp536vvok' });
var cl = Cloudinary.new({ cloud_name: 'dp536vvok' });

export const CloudImage = ({ publicId, width, height, className }) => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  if (width && width.split('').indexOf('%') !== -1) {
    console.log(getWindowDimensions(), width, height, '...window.width');
    const windowSize = getWindowDimensions();
    if (windowSize.width > 1200) {
      width = 1200;
    } else if (windowSize.width > 768) {
      width = 800;
    } else if (windowSize.width > 300) {
      width = 500;
    } else {
      width = 300;
    }
    console.log('Calculated width.......', width);
  }

  //console.log(publicId, width, height, '...window.width.......');
  const url = cl.url(publicId, {
    //height: height + 100,
    width: width,
    crop: 'scale',
  });

  //console.log(url, '.....url');

  //var tr = Cloudinary.Transformation.new({ cloud_name: 'dp536vvok' });

  // console.log(
  //   cl.url('uploads/tmp-images/bfmw0fmhymzmvkaiuh69.jpg', {
  //     height: 100,
  //     width: 300,
  //     crop: 'scale',
  //   }),
  //   'URL,............'
  // );
  // return (
  //   <div
  //     className={className}
  //     style={{ width: width, height: height }}
  //     dangerouslySetInnerHTML={{
  //       __html: cloudinaryCore
  //         .imageTag(publicId, {
  //           //width: width,
  //           //height: height,
  //           crop: 'scale',
  //           background: '#ca3333',
  //         })
  //         .toHtml(),
  //     }}
  //   />
  // );
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
    <img alt='' src={url} width={width} height={height} className={className} />
    // <CloudinaryContext cloudName='dp536vvok'>
    // <Image
    //   cloudName='dp536vvok'
    //   publicId='uploads/tmp-images/kdwzbzfkkgmbpyn1zp9r'
    // >
    //   <Transformation width='357' crop='fit' />
    // </Image>
    // </CloudinaryContext>
  );
};
