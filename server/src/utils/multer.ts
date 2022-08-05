import multer from 'multer'
import path from 'path'
import { v4 as uuidV4} from 'uuid'

// Multer config
export default multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = uuidV4()
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  }),
  fileFilter: (req, file, cb) => {

    const ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"));
      return;
    }

    cb(null, true);
  },
  
});