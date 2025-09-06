import "./App.css";
import { useState } from "react";
import tina from "./assets/tina.png";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      {/* Bacground original bg-blue-950 */}
      <div className="w-[1920px] h-lvh relative bg-[url(./assets/bg2.jpg)] bg-cover bg-center overflow-hidden">
        {/* Chat Window as a flip card */}
        <div className={`chat-card w-[872px] h-[832px] left-[987px] top-[50px] absolute ${isFlipped ? "is-flipped z-[25]" : "z-[5]"}`}>
          <div className="chat-inner w-full h-full">
            {/* Front face: blank */}
            <div className="face front w-full h-full bg-white/20 backdrop-blur-md rounded-[32px] shadow-[0px_30px_100px_0px_rgba(137,188,255,0.30)] overflow-hidden relative flex justify-end">
              <img className="" src={tina} alt="" />
            </div>

            {/* Back face: the current chat UI */}
            <div className="face back w-full h-full bg-white/20 backdrop-blur-md rounded-[32px] shadow-[0px_30px_100px_0px_rgba(137,188,255,0.30)] overflow-hidden relative">
              <div className="w-52 h-72 left-[404.60px] top-[482.83px] absolute bg-blue-300 rounded-full blur-[150px]" />
              <div className="w-80 h-96 left-[204.89px] top-[532.83px] absolute bg-fuchsia-400 rounded-full blur-[250px]" />
              <div className="w-80 left-[263px] top-[146px] absolute inline-flex flex-col justify-start items-center gap-12">
                <div className="w-5 h-5 bg-stone-950" />
                <div className="w-5 h-5 bg-stone-950" />
                <div className="w-5 h-5 bg-stone-950" />
                <div className="self-stretch text-center justify-start text-stone-950 text-2xl font-normal font-['Manrope']">Ask Tina anything!</div>
              </div>
              <div className="w-72 h-12 p-2.5 left-[103px] top-[660px] absolute bg-white/50 rounded-lg outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 justify-start text-stone-950 text-sm font-normal font-['DM_Sans']">What vehicle do you drive?</div>
              </div>
              <div className="w-[668px] p-2.5 left-[102px] top-[720.91px] absolute bg-white rounded-lg outline-1 outline-offset-[-1px] outline-stone-950/30 inline-flex justify-between items-center">
                <div className="w-72 justify-start text-slate-500 text-sm font-normal font-['Manrope']">Ask me anything about your insurance</div>
                <div className="w-9 h-9 relative overflow-hidden">
                  <div className="w-9 h-9 left-[0.31px] top-[0.56px] absolute bg-slate-600/50" />
                </div>
              </div>
              <div className="w-96 h-12 p-2.5 left-[394px] top-[660px] absolute bg-white/50 rounded-lg outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 justify-start text-stone-950 text-sm font-normal font-['DM_Sans']">What model of Mazda?</div>
              </div>
              <div className="w-72 left-[110px] top-[622px] absolute justify-start text-slate-500 text-sm font-bold font-['Manrope']">
                Suggestions on what to ask Our AI
              </div>
            </div>
          </div>
        </div>

        {/* Title (should be above chat when chat is flipped) */}
        <div className="title w-[963px] h-[190px] p-8 left-[96px] top-[204px] absolute bg-white rounded-[128px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] inline-flex justify-center items-center gap-2.5 z-[20] bg-[url(./assets/turnersLogo.jpg)] bg-cover bg-center ">
          {/* <img className="h-[550px]" src={turnersLogo} alt="" /> */}
          {/* <div className="text-center justify-start text-stone-950 text-9xl font-bold font-['Manrope']">Turner's Cars</div> */}
        </div>

        {/* Button that triggers the flip */}
        <div
          className="button w-[551px] h-[110px] p-8 left-[113px] top-[467px] absolute bg-white backdrop-blur-md rounded-[128px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] outline-4 outline-offset-[-4px] outline-blue-300 inline-flex justify-center items-center gap-2.5 cursor-pointer"
          role="button"
          aria-pressed={isFlipped}
          tabIndex={0}
          onClick={() => setIsFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFlipped((f) => !f);
            }
          }}
          title="Flip chat"
        >
          {isFlipped ? (
            <div className="wrapper" aria-live="polite" aria-label="Chatting with Tina">
              <span className="letter letter1">C</span>
              <span className="letter letter2">h</span>
              <span className="letter letter3">a</span>
              <span className="letter letter4">t</span>
              <span className="letter letter5">t</span>
              <span className="letter letter6">i</span>
              <span className="letter letter7">n</span>
              <span className="letter letter8">g</span>
              <span className="letter letter9">&nbsp;</span>
              <span className="letter letter10">w</span>
              <span className="letter letter11">i</span>
              <span className="letter letter12">t</span>
              <span className="letter letter13">h</span>
              <span className="letter letter14">&nbsp;</span>
              <span className="letter letter15">T</span>
              <span className="letter letter16">i</span>
              <span className="letter letter17">n</span>
              <span className="letter letter18">a</span>
              <span className="letter letter19">.</span>
              <span className="letter letter20">.</span>
              <span className="letter letter21">.</span>
              <span className="letter letter22">&nbsp;</span>
              <span className="letter letter23">&nbsp;</span>
              <span className="letter letter24">&nbsp;</span>
            </div>
          ) : (
            <div className="text-center justify-start text-stone-950 text-4xl font-normal font-['monospace'] ">Chat with Tina</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
