export const fontUploadConfig = {
  extensions: ['image/png', 'application/octet-stream'],
  destination: 'uploads/fonts',
  fileSize: 3145728,
  files: 2,
  name: 'fonts',
};

export const imageUploadConfig = {
  extensions: ['image/png', 'image/jpeg', 'image/jpg'],
  destination: 'uploads/tmp-images',
  fileSize: 3145728,
  files: 1,
  name: 'image',
};