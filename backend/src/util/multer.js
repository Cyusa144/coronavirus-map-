import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only!', null);
};
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter,
});

export default upload;
