import { v2 as cloudinary } from 'cloudinary';
import EnvConstant from '@/constants/envConstants';

cloudinary.config({
  cloud_name: EnvConstant.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConstant.CLOUDINARY_API_KEY,
  api_secret: EnvConstant.CLOUDINARY_API_SECRET,
});

export default cloudinary;
