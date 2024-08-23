"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload:React.FC<ImageUploadProps> =({onChange, value}) => {
  const handleUpload = useCallback((result:any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
    onSuccess = {handleUpload}
    uploadPreset="my_image_upload"
    options={{
      maxFiles: 1,
    }}
    >
      {({open})=>{
        return(
          <div
          onClick={()=>{open?.()}}
          className="relative cursor-pointer hovwe:opacity-70 transition boder-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold tex-lg">
            click to upload
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                  <Image
                  alt="upload"
                  fill
                  style={{objectFit: "cover"}}
                  src={value}
                  />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>

  )
}

export default ImageUpload