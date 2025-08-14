import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface ImageSliderProps {
  images: string[] | string;
  title?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://mis.adani.digital";
const toAbsolute = (url: string) => {
  if (!url) return "";
  try {
    return new URL(url).href; // already absolute
  } catch {
    return API_BASE.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
  }
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images = [], title }) => {
  const list = (Array.isArray(images) ? images : [images])
    .filter(Boolean)
    .map((u) => toAbsolute(String(u)));

  const many = list.length > 1;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full h-full flex flex-col">
      {title && <h3 className="text-[#007BBD] text-sm font-semibold mb-2">{title}</h3>}

      {list.length > 0 ? (
        <div className="relative w-full h-48 md:h-56 overflow-hidden rounded">
          <Swiper modules={[Navigation, Pagination]} navigation={many} pagination={many ? { clickable: true } : false} className="w-full h-full">
            {list.map((src, idx) => (
              <SwiperSlide key={`${src}-${idx}`} className="!bg-transparent !h-full !w-full">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=Image+not+found";
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No images available</div>
      )}
    </div>
  );
};

export default ImageSlider;
