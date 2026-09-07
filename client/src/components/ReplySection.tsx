
import { useState, useEffect } from "react";
import { Card } from "./Card";

type Data = {
  id: number;
  name: string;
  message: string;
  reply: string;
};






export function ReplySection() {
  const [data, setData] = useState<Data[]>([]);
  const [current, setCurrent] = useState<number>(0);



  const prevPage = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const nextPage = () => {
    if (current < data.length - 1) setCurrent(current + 1);
  };


  useEffect(() => {
    getData();
  }, []);

  async function getData() {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/public-messages`);

      const data = await response.json();
      console.log(data.success, data.message);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      console.log(data.data)

      setData(data.data);


    } catch (err) {
      console.error("Network on server Error: ", err);
    }
  }

  const q = data[current];


  return (
    <section className="max-w-lg w-full px-5 py-16 mx-auto">
      <p className="ml-5 text-gray-600 mb-2">{data.length}</p>
      {data.length == 0
        ? <p className=" font-semibold text-sm text-center">he hasn't replied to any question yet </p>
        : (<div>
          <Card name={q.name} question={q.message} reply={q.reply}></Card>
          <div className="flex items-center justify-center gap-10 mt-5">
            <button onClick={prevPage} disabled={current == 0}
              className={"flex justify-center items-center  rounded-full w-10 h-6   active:scale-90 transition duration-200 ease-in-out " + (current == 0 ? " bg-black/20 text-white" : " shadow-md text-gray-500 ")}>&lt;</button>
            <button onClick={nextPage} disabled={current == data.length - 1}
              className={"flex justify-center items-center rounded-full w-10 h-6   active:scale-90 transition duration-200 ease-in-out" + (current == data.length - 1 ? " bg-black/20 text-white" : " shadow-md text-gray-500 ")}>&gt;</button>
          </div></div>)}
    </section >
  );
}
