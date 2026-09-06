



type CardProps = {
  name: string;
  question: string;
  reply: string;

};

export function Card({ name, question, reply, }: CardProps) {

  return (
    <div className="w-full rounded-3xl shadow-md overflow-y-hidden ">
      {/* header */}
      <div className="p-3 font-bold text-center text-white  bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 ">send me anonymous messages!</div>
      {/* content */}
      <div className="bg-white p-6 py-8 font-[650] text-xl ">

        <p className="text-sm text-orange-950/50 mb-2">name: {name}</p>
        <p className="border-b pb-5 mb-5">{question}</p>
        <p className="text-sm text-orange-950/50 mb-2">reply:</p>
        <p>{reply}</p>


      </div>





    </div>

  );
}

export default Card;
