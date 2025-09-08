// src/Components/ImageSlider.tsx
import React, { useMemo } from "react";
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

const isLikelyUrl = (s: string) => /^https?:\/\//i.test(s) || s.startsWith("/");

const filenameFromUrl = (u: string) => {
  try {
    const p = new URL(u, API_BASE);
    return decodeURIComponent(p.pathname.split("/").pop() || "image");
  } catch {
    return "image";
  }
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images = [], title }) => {
  const list = useMemo(() => {
    const raw = (Array.isArray(images) ? images : [images])
      .filter(Boolean)
      .map((u) => String(u).trim())
      .filter((u) => isLikelyUrl(u))
      .map((u) => toAbsolute(u));

    const seen = new Set<string>();
    return raw.filter((u) => {
      if (seen.has(u)) return false;
      seen.add(u);
      return true;
    });
  }, [images]);

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        {title ? <h3 className="text-[#007BBD] text-sm font-semibold">{title}</h3> : <span />}
        {list.length > 0 && (
          <span className="text-[11px] text-gray-500">
            {list.length} {list.length === 1 ? "image" : "images"}
          </span>
        )}
      </div>

      {list.length > 0 ? (
        <div
          className="
            relative w-full rounded bg-black/5
            h-64 md:h-72 lg:h-80 max-h-[60vh] overflow-hidden
          "
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="w-full h-full"
          >
            {list.map((src, idx) => (
              <SwiperSlide key={`${src}-${idx}`} className="!bg-transparent !h-full !w-full">
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={src}
                    alt={filenameFromUrl(src)}
                    loading="lazy"
                    className="block mx-auto max-h-full h-full w-auto object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/800x450?text=Image+not+found";
                    }}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          No images available
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
