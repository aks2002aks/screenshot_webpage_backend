import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import stream from "stream";

dotenv.config();

cloudinary.config({
  cloud_name: "dpd8gkzam",
  api_key: "934525916788619",
  api_secret: process.env.CLOUDINARY_SECRET!,
});

async function saveImageAndGetImageUrl(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { url } = req.body;

    // Optimized Axios request with stream response type
    const resp = await axios.get<stream.Readable>(
      `https://api.pikwy.com?token=${process.env.PIKWY_API_KEY}&url=${url}&response_type=image&full_page=1`,
      {
        responseType: "stream",
      }
    );

    // Cloudinary upload configuration
    const cloudinaryResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "screenshots",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          }
        );

        resp.data.pipe(uploadStream);
      }
    );

    // Return the secure URL of the uploaded image
    const imageUrl: string = cloudinaryResponse.secure_url;
    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    // Improved error handling with informative error messages
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export { saveImageAndGetImageUrl };
