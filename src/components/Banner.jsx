import { useEffect, useState } from "react";

function Banner() {
  const banners = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="relative overflow-hidden mt-10 rounded-lg">
      {/* Banner Image */}
      <img
        src={banners[current]}
        alt={`Banner ${current + 1}`}
        className="w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300
              ${current === index ? "w-6 h-2 bg-white" : "w-2 h-2 bg-gray-400"}
            `}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
