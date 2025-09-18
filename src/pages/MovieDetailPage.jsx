import { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom"
//const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_KEY = '268c45d0';


export default function MovieDetailPage(){
    const { id }= useParams(); // Id film ro az url stekhraj mikone.

    // tanzim state ha
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect( () => {
        // مکانیزم حرفه‌ای برای لغو درخواست در صورت حذف کامپوننت
        const controller = new AbortController();

        async function fetchDetails () {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&i=${id}`,
                    { signal: controller.signal }); // اتصال کنترلر به درخواست
                const data = await response.json();
                (data.Response === "True" ? setDetails(data) : setError(data.Error));
            } catch (err) {
                // فقط در صورتی خطا را در State قرار بده که از نوع AbortError نباشد
                if (err.name !== 'AbortError') {
                setError(err.message || "یک خطای ناشناخته رخ داد");
                }
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchDetails();
        // تابع پاکسازی: زمانی اجرا میشه که کامپوننت حذف بشه
        return () =>{
            controller.abort();
        };
    },[id]);

    if(isLoading){
        return <div className="flex items-center justify-center h-screen bg-background">
            <h3 className="text-2xl text-white">
                در حال بارگذاری
            </h3>
        </div>
    }
    if(error){
        return <div className="flex items-center justify-center h-screen bg-background">
            <h3 className="text-2xl text-red-500">
                خطا : {error}
            </h3>
        </div>
    }

    return(
        <>
        {/*        ساختار کلی صفحه و کانتینر */}
        <div className="font-sans bgp-4 bgmin-h-screen text-text-main sm:p-8 bg-background"> 
            {/* کانتینر محتوای اصلی */}
            <div className="max-w-4xl mx-auto">
                {/* چیدمان دو ستونه یک سمت اطلاعات فیلم و سمت دیگر پوستر فیلم */}
                {details &&(
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/*پوستر فیلم*/}
                        <div className="md:col-span-1">
                            <img src={details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/500x750.png?text=No+Image"}
                                alt={details.Title} className="w-full rounded-lg shadow-lg"/>
                        </div>
                        {/* اطلاعات فیلم*/}
                        <div className="md:col-span-2">
                            <h1 className="mb-2 text-4xl font-bold text-text-main">
                                {details.Title}
                                <span className="text-2xl font-normal text-text-secondary">{details.Year}</span>
                            </h1>
                            <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                                <span>{details.Rated}</span>
                                <span>|</span>
                                <span>{details.Runtime}</span>
                                <span>|</span>
                                <span>{details.Genre}</span>
                            </div>
                            <p className="mb-6 text-text-main">{details.Plot}</p>
                            <div className="space-y-3 text-sm">
                                <p><strong className="inline-block w-24 text-text-secondary">کارگردان:</strong>
                                    <span className="text-primary">{details.Director}</span>
                                </p>
                                <p><strong className="inline-block w-24 text-text-secondary">نویسنده:</strong> {details.Writer}</p>
                                <p><strong className="inline-block w-24 text-text-secondary">بازیگران:</strong> {details.Actors}</p>
                                <p><strong className="inline-block w-24 text-text-secondary">امتیاز IMDb:</strong> <span className="text-lg font-bold text-yellow-400">{details.imdbRating} ⭐</span></p>
                            </div>
                            {/* ۲. لینک بازگشت استایل‌دهی شده */}
                            <Link to="/" className="inline-block px-4 py-2 mt-8 font-bold transition-colors rounded-md bg-primary text-background hover:bg-blue-400">
                                &larr; بازگشت به جستجو
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
