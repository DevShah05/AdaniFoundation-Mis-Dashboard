// src/Components/ImageSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ImageSliderProps {
  data: any[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ data }) => {
  const preImages: { src: string; subActivity: string }[] = [];
  const postImages: { src: string; subActivity: string }[] = [];

  data.forEach((item) => {
    const sub = item.subActivity || item.activity || "Untitled";

    if (Array.isArray(item.preActivityImages)) {
      item.preActivityImages.forEach((src: string) =>
        preImages.push({ src, subActivity: sub })
      );
    }

    if (Array.isArray(item.postActivityImages)) {
      item.postActivityImages.forEach((src: string) =>
        postImages.push({ src, subActivity: sub })
      );
    }

    if (
      !item.preActivityImages &&
      !item.postActivityImages &&
      Array.isArray(item.uploadedImages)
    ) {
      item.uploadedImages.forEach((src: string) =>
        postImages.push({ src, subActivity: sub })
      );
    }
  });

  const renderSlider = (title: string, images: { src: string; subActivity: string }[]) => {
    if (images.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#6B1E82] mb-2 text-center">{title}</h3>
        <Swiper spaceBetween={20} slidesPerView={1} loop>
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <img
                  src={img.src}
                  alt={`Slide ${index}`}
                  className="rounded-lg shadow w-[300px] h-[200px] object-cover"
                />
                <p className="text-xs mt-1 text-gray-600">{img.subActivity}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <div className="px-4 mt-8">
      <h2 className="text-sm font-semibold text-[#6B1E82] mb-4">Pre/Post Activity Images</h2>
      <div className="bg-white rounded-lg shadow p-4">
        {renderSlider("Pre Activity", preImages)}
        {renderSlider("Post Activity", postImages)}
        {preImages.length === 0 && postImages.length === 0 && (
          <p className="text-sm text-gray-500 text-center">No images available.</p>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
