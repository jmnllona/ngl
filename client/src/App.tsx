import "./App.css";
import { Box } from "./components/ChatBox.tsx";
import { TopBar } from "./components/TopBar.tsx"
import { ReplySection } from "./components/ReplySection.tsx"

function App() {
  return (<div className="flex flex-col">
    <section className="min-h-max  bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <div className="flex flex-col max-w-lg w-full  mx-auto my-16 px-5  ">
        <TopBar></TopBar>
        <Box></Box>
      </div>
    </section>

    <ReplySection></ReplySection>

  </div>
  );

}

export default App;
