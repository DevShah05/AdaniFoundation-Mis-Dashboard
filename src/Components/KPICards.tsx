import React from "react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface KPICardsProps {
  data: any[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<
    string,
    {
      plannedField: string;
      executedField: string;
      girlsField: string;
      boysField: string;
    }
  >;
  fieldLabelMap: Record<string, string>;
}

const KPICards: React.FC<KPICardsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
  fieldLabelMap,
}) => {
  if (!data || data.length === 0) return null;

  const key = selectedSubActivity || selectedActivity;
  if (!key || !mapping[key]) return null;

  const fieldsToShow = Object.values(mapping[key]);
  const totals: Record<string, number> = {};

  fieldsToShow.forEach((field) => {
    totals[field] = data.reduce((sum, row) => sum + (row[field] || 0), 0);
  });

  const displayData = Object.entries(totals).map(([field, value]) => ({
    label: fieldLabelMap[field] || field,
    value,
  }));

  return (
    <div className="mt-6 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-base font-semibold text-[#6B1E82] mb-4">
        Key Performance Indicators
      </h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {displayData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center min-h-[120px] hover:shadow-md transition">
              <h4 className="text-xs text-gray-600 mb-1 text-center">
                {item.label}
              </h4>
              <div className="text-lg font-bold text-[#6B1E82]">
                <CountUp end={item.value} duration={1.5} separator="," />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KPICards;
