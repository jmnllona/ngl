
import { useState } from "react";



export function ImageSlider() {
    const [data, setData] = useState<string[]>([
        "../images_pokemon/pokemon_fire_red.jpg",
        "../images_pokemon/pokemon_emerald.jpg",
        "../images_pokemon/pokemon_ash_gray.jpg",
        "../images_pokemon/pokemon_light_platinum.jpg",
        "../images_pokemon/pokemon_glazeed.jpg",
        "../images_pokemon/pokemon_platinum.jpg",
        "../images_pokemon/pokemon_gaia.webp",]);

    const [index, setIndex] = useState<number>(0);



    const prevPage = () => {
        if (index > 0) setIndex(index - 1);
    };

    const nextPage = () => {
        if (index < data.length - 1) setIndex(index + 1);
    };


    const current = data[index];


    return (
        <section className="max-w-lg w-full px-5 py-16 mx-auto">
            <p className="ml-5 text-gray-600 mb-2">~{index + 1}/{data.length}~</p>
            <div id="image-slider">
                <div id="content">
                    {data.length == 0 ? <p className=" font-semibold text-sm text-center"> No pictures</p>
                        :
                        <div id="content-wrapper" className="flex flex-col items-center">
                            <img src={current} alt="Pokemon art cover" className="max-h-60" />
                        </div>
                    }


                </div>

                <div id="button-field" className="flex items-center justify-center gap-10 mt-5">
                    <button onClick={prevPage} disabled={index == 0}
                        className={"flex justify-center items-center  rounded-full w-10 h-6   active:scale-90 transition duration-200 ease-in-out " + (index == 0 ? " bg-black/20 text-white" : " shadow-md text-gray-500 ")}>&lt;</button>
                    <button onClick={nextPage} disabled={index == data.length - 1 || data.length == 0}
                        className={"flex justify-center items-center rounded-full w-10 h-6   active:scale-90 transition duration-200 ease-in-out" + (index == data.length - 1 || data.length == 0 ? " bg-black/20 text-white" : " shadow-md text-gray-500 ")}>&gt;</button>
                </div>

            </div>
        </section >
    );
}
