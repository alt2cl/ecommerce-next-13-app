// cloudinaryConfig.js
import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = "dn5bsevc9"; // Replace with your Cloud Name
const cl = new Cloudinary({ cloud: { cloudName } });

export default cl;
