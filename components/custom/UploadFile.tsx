import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface UploadFileProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: string;
}

export default function UploadFile({
  value,
  onChange,
  endpoint,
  page,
}: UploadFileProps) {
  return (
    <div className="flex flex-col gap-2">
      {page === "Edit Courses" && value !== "" && (
        <Image
          src={value}
          alt="image"
          width={500}
          height={500}
          className="w-[280px] h-[200px] object-cover rounded-xl"
        />
      )}

      {page === "Edit Sections" && value !== "" && (
        <p className="text-sm font-medium">{value}</p>
      )}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[280px] h-[200px]"
      />
    </div>
  );
}
