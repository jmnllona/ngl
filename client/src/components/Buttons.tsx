import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import './customStyle.css'

interface MusicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  children?: React.ReactNode;
  musicname?: string;
}

export const MusicButton: React.FC<MusicButtonProps> = ({
  musicname = "../bg1.mp3",
  children,
  className,           // allow extra custom classes
  ...props }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;


    audio.pause();
    audio.load();
    setIsPlaying(false)

  }, [musicname]); // Run whenever the selected track changes


  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };



  return (
    <div className={"flex items-center " + className}>
      <button
        onClick={togglePlay}
        className={(isPlaying ? "bg-transparent" : "bg-slate-900 hover:bg-slate-800 ") + "flex items-center px-1.5 py-1.5 text-white rounded-full transition duration-500 ease-in-out"}
        {...props}
      >

        {isPlaying ?

          <div className="musicPlay flex items-center gap-0.5">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          : <FaMusic size={12} className="text-gray-200" />}
      </button>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={musicname} />
    </div>
  );
};


export default { MusicButton }