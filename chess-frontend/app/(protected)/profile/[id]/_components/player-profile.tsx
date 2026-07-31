import { getInitials } from "@/lib/constants/get-initials";
import Image from "next/image";

export const PlayerProfile = ({
  name,
  image,
}: {
  name: string;
  image: string | null;
}) => {
  if (!image)
    return (
      <div className="w-full h-full bg-neutral-6 flex items-center justify-center">
        <span className="text-6xl font-bold text-green-5 tracking-wider">
          {getInitials(name)}
        </span>
      </div>
    );

  return (
    <Image
      src={image}
      alt={name}
      width={100}
      height={100}
      className="w-full h-full object-cover"
    />
  );
};
