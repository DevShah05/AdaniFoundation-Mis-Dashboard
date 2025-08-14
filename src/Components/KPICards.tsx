import React, { useMemo } from "react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface KPICardsProps {
  data: any[];
  selectedActivity: string;
  selectedSubActivity: string;
  mapping: Record<string, { plannedField: string; executedField: string; girlsField: string; boysField: string }>;
  fieldLabelMap: Record<string, string>;
  className?: string;
}

const COLS = ["#007BBD", "#A4C639", "#6B1E82", "#E6518B"];
const nf = new Intl.NumberFormat("en-IN");

const KPICards: React.FC<KPICardsProps> = ({
  data,
  selectedActivity,
  selectedSubActivity,
  mapping,
  fieldLabelMap,
  className = "",
}) => {
  const items = useMemo(() => {
    const key = selectedSubActivity || selectedActivity;
    if (!data?.length || !key || !mapping[key]) return [];
    const m = mapping[key];
    const orderedFields = [m.plannedField, m.executedField, m.girlsField, m.boysField].filter(Boolean);

    return orderedFields.map((field) => {
      const value = data.reduce((sum, row) => {
        const v = Number(row?.[field]);
        return sum + (Number.isFinite(v) ? v : 0);
      }, 0);
      return { field, label: fieldLabelMap[field] || field, value };
    });
  }, [data, selectedActivity, selectedSubActivity, mapping, fieldLabelMap]);

  if (items.length === 0) {
    return (
      <section className={`mt-6 px-4 max-w-screen-xl mx-auto ${className}`}>
        <div className="bg-white rounded-lg shadow p-6 text-center text-sm text-gray-500">
          Select an Activity or Sub-Activity to view KPIs.
        </div>
      </section>
    );
  }

  return (
    <section className={`mt-6 px-4 max-w-screen-xl mx-auto ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-[#007BBD]">Key Performance Indicators</h2>
        {(selectedActivity || selectedSubActivity) && (
          <span className="text-[11px] text-gray-500">
            {selectedSubActivity ? `For “${selectedSubActivity}”` : `For “${selectedActivity}”`}
          </span>
        )}
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 }, 1280: { slidesPerView: 5 } }}
        autoHeight
        watchOverflow
        observer
        observeParents
      >
        {items.map((item, i) => (
          <SwiperSlide key={item.field} className="h-auto">
            <article
              className="bg-white rounded-lg shadow p-3 sm:p-4 h-full flex flex-col items-center justify-center hover:shadow-md transition relative overflow-hidden"
              aria-label={`KPI ${item.label}`}
            >
              <span className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: COLS[i % COLS.length] }} aria-hidden />
              <h4 className="text-xs sm:text-sm text-gray-600 mb-1 text-center">{item.label}</h4>
              <div className="text-lg sm:text-xl font-bold" style={{ color: COLS[i % COLS.length] }}>
                <CountUp end={item.value} duration={1.2} formattingFn={(val) => nf.format(Math.round(val))} />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default KPICards;
