"use client";

import { useState, useTransition } from "react";
import { Camera } from "lucide-react";
import { ImageCropModal } from "./image-crop-modal";
import { uploadAvatar } from "@/actions/user";
import { PlayerProfile } from "./player-profile";

export const UserProfile = ({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [optimisticImage, setOptimisticImage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleCropComplete = (compressedBlob: Blob) => {
    const previewUrl = URL.createObjectURL(compressedBlob);
    setOptimisticImage(previewUrl);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("avatar", compressedBlob, "avatar.webp");
        await uploadAvatar(formData);
      } catch (error) {
        console.error("Upload failed", error);
        setOptimisticImage(null);
        alert("Failed to upload image.");
      }
    });
  };

  const displayUrl = optimisticImage || image;

  return (
    <>
      <div className="relative w-fit">
        <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden ">
          <PlayerProfile name={name} image={displayUrl} />
        </div>

        <button
          onClick={() =>
            document.getElementById("avatar-upload-input")?.click()
          }
          disabled={pending}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-green-5 border-2 border-neutral-6 flex items-center justify-center cursor-pointer hover:bg-green-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <div className="w-4 h-4 border-2 border-neutral-7 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera size={20} color="black" />
          )}
        </button>

        <input
          id="avatar-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {imageSrc && (
        <ImageCropModal
          open={showCropModal}
          onClose={() => setShowCropModal(false)}
          imageSrc={imageSrc}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
};
