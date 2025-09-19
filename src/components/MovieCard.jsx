import { useState } from "react";

// بهتر است API_KEY را در یک فایل جداگانه یا متغیرهای محیطی قرار دهیم،
// اما برای این تمرین اینجا مشکلی ندارد.
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieCard({ movie }) {
  const [details, setDetails] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  async function fetchDetails() {
    if (details || isFetchingDetails) return; // اگر در حال دریافت بودیم هم دوباره درخواست نده

    setIsFetchingDetails(true);
    try {
      const response = await fetch(
        `https://omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setDetails(data);
      }
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    } finally {
      setIsFetchingDetails(false);
    }
  }

  return (
    <div
      onMouseEnter={fetchDetails}
      // کلاس key باید روی بالاترین عنصر در حلقه map باشد، نه اینجا
      className="relative overflow-hidden transition-all duration-300 ease-in-out rounded-lg shadow-lg group bg-card hover:shadow-primary/40"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x444.png?text=No+Image"
        }
        alt={movie.Title}
        className="object-cover w-full h-96"
      />

      {/* لایه شناور */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 ease-in-out opacity-0 bg-black/80 backdrop-blur-sm group-hover:opacity-100">
        {/* ۱. تمام منطق نمایش به داخل لایه شناور منتقل شد */}
        {isFetchingDetails && <p className="text-white animate-pulse">در حال دریافت اطلاعات...</p>}
        
        {details && (
          <>
            <h4 className="mb-2 text-lg font-bold text-white">{details.Title}</h4>
            <p className="mb-4 text-xs text-slate-300">{details.Plot}</p>
            {/* ۲. ساختار نمایش جزئیات تمیزتر و بهینه‌تر شد */}
            <div className="w-full text-sm text-left text-slate-200">
              <p><span className="font-semibold">کارگردان: </span>{details.Director}</p>
              <p><span className="font-semibold">بازیگران: </span>{details.Actors}</p>
              <p><span className="font-semibold">امتیاز IMDb: </span>{details.imdbRating} ⭐</p>
            </div>
          </>
        )}
      </div>

      {/* عنوان پایینی */}
      <div className="p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-lg font-bold truncate text-text-main">{movie.Title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{movie.Year}</p>
      </div>
    </div>
  );
}