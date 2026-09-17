import React, { useState} from "react";
import pokemon_data from "../assets/pokemon_data.json";
type Pokemon = {

    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    }

    description: string;
    evolvesTo: number[] | null;
    evolvesFrom: number[] | null;
    image: string;
    scale: number;

}



const types: Record<string, string> = {
    "Fire": "bg-orange-600/75",
    "Water": "bg-blue-600/75",
    "Grass": "bg-lime-500/75",
    "Rock": "bg-stone-500",
    "Ground": "bg-yellow-500/50",
    "Psychic": "bg-red-300",
    "Dark": "bg-gray-900/50",
    "Electric": "bg-yellow-300",
    "Flying": "bg-cyan-500/30",
    "Fairy": "bg-pink-300",
    "Ghost": "bg-fuchsia-900/75",
    "Steel": "bg-gray-200",
    "Poison": "bg-purple-600/75",
    "Normal": "bg-gray-400",
    "Bug": "bg-lime-600/90",
    "Fighting": "bg-red-600",
    "Ice": "bg-cyan-400",
    "Dragon": "bg-indigo-500/75",
}

const style: Record<string, string> = {

    "amber": " bg-amber-50 border-2 border-amber-700/20 ",
    "bg": " bg-amber-50 "
}


export const Aside = ({ pokemon }: { pokemon: Pokemon }) => {
    const [index, setIndex] = useState<number>(1);

const getPokemonImageName = (name: string) => {
  const specialNames: Record<string, string> = {
    "nidoran♀": "nidoran-f",
    "nidoran♂": "nidoran-m",
    "farfetch'd": "farfetchd",
    "mr. mime": "mr-mime",
  };

  return specialNames[name.toLowerCase()] ?? name.toLowerCase();
};

    const prevPage = () => {
        if (index > 1) setIndex(index - 1);
    };

    const nextPage = () => {
        if (index < 3) setIndex(index + 1);
    };

    return (
        <aside className={"max-w-lg w-full  px-6 py-3 max-h-[500px] h-[500px]  border-2 rounded-md " + style["amber"]}>
           
    {/* This stays on every page */}
    <header className="flex items-center text-center justify-center">
        <h1 className="text-xl text-amber-900/60 mr-auto">
            {index === 1 && "Pokemon Info"}
            {index === 2 && "Stats"}
            {index === 3 && "Moves"}
        </h1>

        <div>
            {index === 1 && "+ - -"}
            {index === 2 && "+ + -"}
            {index === 3 && "+ + +"}
        </div>

        <div className="flex items-center justify-center gap-10 ml-auto">

            <button
                onClick={prevPage}
                disabled={index <= 1}
                className="..."
            >
                &lt;
            </button>

            <button
                onClick={nextPage}
                disabled={index >= 3}
                className="..."
            >
                &gt;
            </button>

        </div>
    </header>


    {/* This image also stays on every page */}
    <div className="w-[200px] h-[200px] flex items-center justify-center">

        <a
            href={`https://pokemondb.net/pokedex/${getPokemonImageName(pokemon.name)}`}
            className="w-full h-full"
        >
            <img
                src={`https://img.pokemondb.net/sprites/black-white/normal/${getPokemonImageName(pokemon.name)}.png`}
                alt={pokemon.name}
                className="w-full h-full object-contain [image-rendering:pixelated]"
                style={{
                    transform: `scale(${pokemon.scale})`
                }}
            />
        </a>

    </div>


    {/* Only THIS part changes */}
    {index === 1 && (
        <div>
            {/* Pokemon information */}
        </div>
    )}

    {index === 2 && (
        <div>
            {/* Stats */}
        </div>
    )}

    {index === 3 && (
        <div>
            {/* Moves */}
        </div>
    )}



        </aside>


    )

}







export const Pokedex = () => {


    const [pokemonData, setPokemonData] = useState<Pokemon[]>(pokemon_data);

    const [search, setSearch] = useState<string>("");
    //aside states
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<Pokemon>(pokemon_data[0]);



    const handleClick = (pokemon: Pokemon) => {
        if (!open) setOpen(true);
        setCurrent(pokemon);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setSearch(input);

        if (input == "") setPokemonData(pokemon_data);
        else {
            setPokemonData(pokemon_data);
            setPokemonData(data => (data.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase()))))
        }

    }

    return (

        <section className="max-w-6xl w-full mx-auto py-16 px-6 ">
            <header className="flex items-center text-center py-2  font-mono font-semibold text-amber-900/70 ">
                <h1 className="text-2xl ml-2">Pokedex</h1>
                <label className="flex gap-5 ml-auto ">
                    <input type="text" id="search-bar" value={search} onChange={handleChange} placeholder="e.g. pikachu"
                        className={"max-w-[200px] p-1 rounded-full border-2  px-5 py-1 text-sm  outline-none bg-amber-50 placeholder:text-amber-700/30 text-amber-900/50 " + style["amber"]} />
                </label>
            </header>
            <div className="flex gap-6 justify-center  font-mono font-semibold text-amber-900/70 ">

                {open && (<Aside pokemon={current} ></Aside>)}


                {/*silder*/}
                <div className=" hidden md:flex flex-col max-h-[500px] h-[500px] min-w-min  overflow-y-auto gap-2 py-2  border-y-2 border-amber-700/20 flex-1">

                    {pokemonData.map((pokemon, index) => <button key={index} onClick={() => handleClick(pokemon)} className={"flex gap-2 p-3.5 text-center text-amber-900/60 text-sm w-full border-2 rounded-md hover:bg-amber-100/75 " + style["amber"]}>
                        <span className="">{pokemon.id}</span>
                        <p className="">{pokemon.name}</p>
                        <div className="flex gap-2"> {pokemon.types.map(type => <div key={type} className={`min-w-[50px] px-2 rounded-[3px] text-white ${types[type]} `}>{type}</div>)}
                        </div>

                    </button>)}
                </div>

            </div>


        </section>

    )


}