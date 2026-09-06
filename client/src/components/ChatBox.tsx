import { useState, useRef, useEffect } from "react";
import "./customStyle.css";


type FormData = {
  name: string;
  message: string;
};

type formError = {
  name?: boolean;
  message?: boolean;
};

const messages = [
  "Wats you favorite pokemon?",
  "Who are you po?",
  "Tanga kaba?",
  "Bat napaka manchild mo?",
  "Jejemon ampt",
  "Pasikat yarn?",
  "Are you a Golder retriever boy?",
  "Bat di ka pumapasok?",
  "Miss kape nga. 3 in 1? hinde yung puro. Nescafe classic, bunga ng 100% puro at natural, kapeng kape",
  "Alam mo dati",
  "Si ano baga",
]




export const Box = () => {
  const [values, setValues] = useState<FormData>({ name: "", message: "" })
  const [errors, setErrors] = useState<formError>({});
  const [timer, setTimer] = useState(0);
  const [disable, setDisable] = useState(false);


  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, name: e.currentTarget.value })
  }
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, message: e.currentTarget.value });
  };

  const handleClick = () => {
    if (validateInput(values) == true) {
      setDisable(true);
      setTimer(10);
      sendMessage();
    }
    else alert("Both inputs required.")
  }

  useEffect(() => {
    if (timer == 0) return;

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setDisable(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000)

    return () => clearInterval(interval)

  }, [timer])



  const sendMessage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          message: values.message
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);



      const data = await response.json();
      if (data.success) {
        alert("Message sent!");
        setValues({ ...values, name: "", message: "" }); // reset form
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Network on server Error: ", err);
    }
  }

  const validateInput = (values: FormData) => {
    const newErrors: formError = {};

    if (!values.name.trim()) newErrors.name = true;
    if (!values.message.trim()) newErrors.message = true;
    console.log(errors)
    setErrors(newErrors);


    return Object.keys(newErrors).length == 0 ? true : false;
  }


  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto"; // reset height
    el.style.height = `${el.scrollHeight}px`; // set to scroll height
  };


  const handleDice = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setValues({ ...values, message: messages[randomIndex] })
  }

  // text change effect

  // useEffect(() => {
  //   const el = textareaRef.current;
  //   if (!el) return;

  //   const interval = setInterval(() => {
  //     // fade out
  //     el.classList.remove("fade-in");
  //     el.classList.add("fade-out");

  //     el.addEventListener(
  //       "animationend",
  //       () => {
  //         // update text
  //         setIndex((prev) => (prev + 1) % messages.length);

  //         // fade in
  //         el.classList.remove("fade-out");
  //         el.classList.add("fade-in");
  //       },
  //       { once: true }
  //     );
  //   }, 3000); // every 2 seconds

  //   return () => clearInterval(interval);
  // }, []);


  return (
    <div>
      <div className=" w-full  rounded-3xl overflow-y-hidden relative">
        {/* header */}
        <div id="header" className=" bg-white flex items-center font-bold p-3 text-sm text-left">
          <img src="../default_avatar.png" className="w-10 h-10 rounded-full mr-3" />
          <div><span className="font-normal">@messages</span>
            <p>Send me anonymous messages!</p></div>
        </div>
        {/* chatbox */}
        <div className="flex flex-col p-4 pb-0 font-[650] text-xl bg-white/40 backdrop-blur-md">
          <input id="nameInput" onChange={handleChange} value={values.name} placeholder="full name"
            className="relative bg-transparent px-2 py-1 outline-none mb-4 placeholder:text-black/40  " />
          <textarea id="question" ref={textareaRef} value={values.message} onChange={handleTextareaChange} onInput={handleInput} autoComplete="off" placeholder="Type something..."
            className="min-h-[100px] p-2 bg-transparent overflow-hidden  resize-none outline-none placeholder:text-black/40 " />
          <button onClick={handleDice} className="absolute right-3 bottom-3  ml-auto bg-gray-200/60 rounded-full p-1 hover:bg-gray-200/40 active:scale-75 ease-in-out-all duration-500"><span className="opacity-100">🎲</span></button>
        </div>
      </div>



      <div className="flex w-full items-center mt-6">
        <button
          onClick={handleClick}
          className="w-full rounded-full bg-black text-white py-3  font-semibold active:scale-95 transition-all
             duration-300 ease-in-out
             disabled:opacity-50 disabled:cursor-not-allowed "
          disabled={disable}
        >
          {disable ? timer : "Send!"}
        </button>

      </div>


    </div>
  )
}