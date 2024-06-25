"use client";

import React from "react";

import cn from "@/components/image/cn";
import Image from "next/image";

/**
 * The props of {@link Image}.
 */
export type ImageSpecificProps = {
  /**
   * The image classes to pass to the image.
   */
  imageClassName?: string;
  /**
   * Should the image be lazy loaded?
   */
  lazy?: boolean;
};

export type ImageProps = ImageSpecificProps &
  React.ComponentPropsWithoutRef<"img">;

const BlurImage = (props: ImageProps) => {
  const { alt, src, width, height, className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden flex justify-center",
        isLoading && "animate-pulse",
        className
      )}
      data-testid="image-container"
    >
      <Image
        className={cn(
          "transition-[scale,filter] duration-700 rounded-md",
          isLoading && "scale-[1.02] blur-xl grayscale",
          imageClassName
        )}
        src={src || ""}
        alt={alt || ""}
        width={width as number}
        height={height as number}
        loading={lazy ? "lazy" : undefined}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
};
export default BlurImage;
