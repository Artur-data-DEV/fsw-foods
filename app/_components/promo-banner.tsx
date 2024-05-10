/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full object-contain px-5"
      sizes="100vw"
      quality={100}
      priority={true}
      {...props}
    />
  );
};

export default PromoBanner;
