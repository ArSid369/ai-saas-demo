

import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';



// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

interface cloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    const { userId, orgId } = await auth();

    if(!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if(
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ){
        return NextResponse.json({error: "Cloudinary credentials not found"}, {status: 500})
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert the File to array of bytes
        const bytes = await file.arrayBuffer();
        // Convert array of bytes to Buffer
        const buffer = Buffer.from(bytes);

        const result = await new Promise<cloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: 'next-cloudinary-uploads'},
                    (error, result) => {
                        if(error) {
                            reject(error);
                        } else resolve(result as cloudinaryUploadResult);
                    } 
                )
                uploadStream.end(buffer);
            }
        )
        
        return NextResponse.json(
            {publicId: result.public_id}, 
            {status: 200}
        );

    } catch (error) {
        console.log('Error uploading file to Cloudinary:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }

}