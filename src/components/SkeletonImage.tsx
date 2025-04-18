"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SkeletonImageProps {
    imgProps: ImageProps;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ imgProps, containerProps }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <span
            {...containerProps}
            className={`relative block overflow-hidden ${containerProps?.className || ""}`}
        >
            {/* Skeleton Placeholder */}
            {isLoading && (
                <span className="block absolute inset-0 rounded-xl bg-gray-100 animate-pulse !duration-50" />
            )}

            {/* Image */}
            <Image
                {...imgProps}
                alt={imgProps.alt}
                width={imgProps.width ||700}
                height={imgProps.height || 700}
                className={`rounded-xl transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${imgProps.className || ""}`}
                onLoad={() => setIsLoading(false)}
            />
        </span>
    );
};

export default SkeletonImage;