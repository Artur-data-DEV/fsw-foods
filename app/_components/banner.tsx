/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const Banner = (props: ImageProps) => {
  return (
    <div className="relative">
      <Image
        height={0}
        width={0}
        className="h-auto w-full object-contain px-6 md:h-64 lg:h-96"
        sizes="90vw"
        quality={100}
        priority={true}
        {...props}
      />
    </div>
  );
};

export default Banner;
