import {
    v2 as cloudinary
} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dp536vvok',
    api_key: '825551411919821',
    api_secret: 'gS_jQq3ahTGq6tledwYpfcg2AZg'
});

//CLOUDINARY_URL=cloudinary://825551411919821:gS_jQq3ahTGq6tledwYpfcg2AZg@dp536vvok

export const cloudUpload = async (imagePath, folder) => {
    try {
        console.log(imagePath, '..imagePath')
        const result = await cloudinary.uploader.upload(imagePath, {
            folder,
        });
        return result
    } catch (e) {
        console.log(e);
    }

}