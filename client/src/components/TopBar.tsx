import { useState, type ChangeEvent, useEffect } from "react";
import { MusicButton } from "./Buttons"
import "./customStyle.css"


const ArtistName: Record<string, string> = {
  "../oohaah.mp3": "twice",
  "../icecream.wav": "blackpink",
  "../hooligan.mp3": "bts"
}


export const TopBar = () => {
  const [selectedmusic, setSelectedMusic] = useState<string>("../SPECIALZ.mp3");
  const [answered, setAnswered] = useState<Record<string, boolean>>({ "../SPECIALZ.mp3": true, "../oohaah.mp3": false, "../icecream.wav": false, "../hooligan.mp3": false });
  const [popup, setPopup] = useState<Record<string, boolean>>({ question: false, help: true });
  const [answer, setAnswer] = useState<string>("");
  const [song, setSong] = useState<string>("");
  const [selectValue, setSelectValue] = useState("")



  useEffect(() => {
    const recordVisit = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/visitors/visit`, {
          method: "POST"
        });
      } catch (error) {
        console.error("Visitor tracking error:", error);
      }
    };

    recordVisit();
  }, []);


  function handleChange(e: ChangeEvent<HTMLSelectElement>) {

    if (answered[e.target.value] == true) {
      setSelectedMusic(e.target.value);
      setSelectValue(e.target.value)

    }
    else {
      setPopup(value => ({ ...value, question: true }));
      setSong(e.target.value);
    }

  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.currentTarget.value);
  }

  function handleAnswer() {

    const ans = answer.toLowerCase().trim();
    console.log(answer, " ", ArtistName[song], " ", ans);

    if (ans === ArtistName[song]) {
      setSelectedMusic(song);
      setAnswered(values => ({ ...values, [song]: true }))
      setSelectValue(song);
      setSong("");
      setPopup(value => ({ ...value, question: false }));
      setAnswer("");
      alert("Same music taste btw")
    }
    else (alert("mali"))
  }


  return (
    <div className="flex w-full pb-2 relative items-center">
      <button onClick={() => { setPopup(value => ({ ...value, help: true })) }}><span className="bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-white/70 text-sm font-bold">?</span></button>
      <div className="flex items-center ml-auto">
        <MusicButton musicname={selectedmusic} className='w-[50px] h-8 justify-center ml-auto '></MusicButton>
        <select value={selectValue} onChange={handleChange} className="font-mono outline-none rounded-full px-2 h-6 bg-slate-900 text-gray-400 text-xs">
          <option value="../SPECIALZ.mp3">bg1</option>
          <option value="../hooligan.mp3">hooligan</option>
          <option value="../oohaah.mp3">Like ooh aah</option>
          <option value="../icecream.wav">ice cream</option>

        </select>
      </div>


      {popup.question && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50" >
          <div className="fixed  top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col p-5 z-50 rounded-3xl bg-white">
            <button onClick={() => { { setPopup(value => ({ ...value, question: false })) }; setAnswer("") }} className="absolute top-2 right-2 text-gray-700 px-2">x</button>
            <p>🔒</p>
            <p className="text-sm">To access this song, enter artist name: </p>
            <input value={answer} onChange={handleInput} placeholder="answer" className="p-1 outline-none border rounded-md mb-3 mt-2" ></input>
            <button onClick={handleAnswer} className="bg-black text-white rounded-full py-1">Enter</button>
          </div>
        </div>
      )}

      {popup.help && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50" >
          <div className="fixed  w-full  max-w-xs md:max-w-sm top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col p-5 z-50 rounded-3xl bg-white text-xs font-serif">
            <span></span>
            <p className="font-semibold">note:</p>
            <p>For study purposes.</p>
            <p>Music belongs to its rightful owner. This is for listening only.</p>
            <br></br>
            <p>check nyo guys kung may bug o error, try no na din HIHI.</p>
            <p>reply below.</p>
            <br></br>
            <p>State your fullname and block</p>
            <p>e.g., </p>
            <p> Lolita  BSN-2B</p>
            <p>late papers will not be accepted</p>



            <button onClick={() => { setPopup(value => ({ ...value, help: false })) }} className="text-gray-700 ml-auto mt-5">Omkie</button>
          </div>
        </div>
      )}

    </div>
  );
}