import "./App.css";
import { useState, useRef, useEffect } from "react";
import tina from "./assets/tina.png";
import tinaAvatar from "./assets/tinaAvatar.png";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "I’m Tina.  I help you to choose right insurance policy.  May I ask you a few personal questions to make sure I recommend the best policy for you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages update or loading state toggles
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const body = { message: userMsg.text, sessionId: "demo" };
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((m) => [...m, { role: "model", text: data.reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
            <div className="face back w-full h-full bg-white/30 backdrop-blur-md rounded-2xl shadow-[0px_30px_100px_0px_rgba(137,188,255,0.30)] overflow-hidden relative flex flex-col ">
              {/**/}
              {/* Mapped Chat messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden py-6 pl-10 pr-20 space-y-2" style={{ paddingBottom: "150px" }}>
                {messages.map((m, i) => (
                  <div key={i} className={`px-2 py-1 flex w-full items-start gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "user" ? (
                      // User message aligned right
                      <>
                        <div className="px-6 py-3 bg-white/70 rounded-lg inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden order-2">
                          <div className="w-fit max-w-[60ch] flex justify-end text-[#bc1944] text-lg font-medium font-['Nunito'] leading-relaxed tracking-tight whitespace-pre-wrap break-words">
                            {m.text}
                          </div>
                        </div>
                      </>
                    ) : (
                      // Model message (left)
                      <>
                        <div className="w-20 h-20 relative shrink-0">
                          <img className="w-20 h-20 left-0 top-0 absolute object-cover overflow-visible" src={tinaAvatar} alt="Tina" />
                          {/* <div className="w-5 h-6 left-[74px] top-[28px] absolute bg-blue-600" /> */}
                          <svg className="w-5 h-6 left-[75px] top-[28px] absolute" viewBox="0 0 20 24">
                            <path
                              d="M0.519425 12.8682L10.9846 18.8483C12.2309 19.5605 13 20.8859 13 22.3213V24H20V0H13V1.67871C13 3.11414 12.2309 4.43951 10.9846 5.15168L0.519426 11.1318C-0.152389 11.5157 -0.15239 12.4843 0.519425 12.8682Z"
                              fill="#0076bc"
                            />
                          </svg>
                        </div>
                        <div className="px-6 py-3 bg-[#0076bc] rounded-lg inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
                          <div className="w-fit max-w-[70ch] justify-start text-white text-lg font-medium font-['Nunito'] leading-relaxed tracking-tight whitespace-pre-wrap break-words">
                            {m.text}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {loading && <div className="text-sm text-slate-600 animate-pulse">Thinking...</div>}
                {error && <div className="text-sm text-red-600">{error}</div>}
              </div>

              <form
                onSubmit={sendMessage}
                className="w-[668px] p-2.5 left-[102px] top-[720.91px] absolute bg-white/90 rounded-lg outline-1 outline-offset-[-1px] outline-stone-950/30 inline-flex justify-between items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Tina anything..."
                  className="w-72 justify-start px-3 text-slate-500 text-md font-normal font-['Manrope'] outline-0"
                  disabled={loading}
                />
                <div type="submit" disabled={loading || !input.trim()} className="w-9 h-9 relative overflow-hidden">
                  <div className="w-9 h-9 left-[0.31px] top-[0.56px] absolute bg-slate-600/50" />
                </div>
              </form>
            </div>
            {/* <div className="face back w-full h-full bg-white/20 backdrop-blur-md rounded-[32px] shadow-[0px_30px_100px_0px_rgba(137,188,255,0.30)] overflow-hidden relative flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`${
                      m.role === "user" ? "bg-blue-500/70 text-white ml-auto" : "bg-white/70 text-stone-900"
                    } max-w-[70%] px-4 py-2 rounded-2xl whitespace-pre-wrap backdrop-blur-sm`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && <div className="text-sm text-slate-600 animate-pulse">Thinking...</div>}
                {error && <div className="text-sm text-red-600">{error}</div>}
              </div>
              <form onSubmit={sendMessage} className="p-4 border-t border-white/30 flex gap-2 bg-white/30">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Tina anything..."
                  className="flex-1 px-4 py-2 rounded-full bg-white/70 focus:outline-none text-sm text-stone-900"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm disabled:opacity-40"
                >
                  Send
                </button>
              </form>
            </div> */}
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
            <div className="text-center justify-start text-stone-950 text-4xl font-medium font-['Nunito'] ">Chat with Tina</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
