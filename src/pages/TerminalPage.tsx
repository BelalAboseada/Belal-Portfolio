import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTerminalTyping, TerminalLine } from "@/hooks/useTerminalTyping";
import { X } from "lucide-react";
import logo from "@/assets/logo.png";

const TerminalPage = () => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showInitialLines, setShowInitialLines] = useState(true);
  const [userLines, setUserLines] = useState<
    Array<{ type: "command" | "output"; content: string | JSX.Element }>
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const terminalLines: TerminalLine[] = useMemo(
    () => [
      {
        type: "output",
        content: (
          <div className="flex flex-col items-start justify-start mb-6 fade-in duration-1000">
            <pre className="font-mono text-xs md:text-sm leading-none text-blue-accent/90 select-none">
              {`
  ██████╗ ███████╗██╗      █████╗ ██╗     
  ██╔══██╗██╔════╝██║     ██╔══██╗██║     
  ██████╔╝█████╗  ██║     ███████║██║     
  ██╔══██╗██╔══╝  ██║     ██╔══██║██║     
  ██████╔╝███████╗███████╗██║  ██║███████╗
  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
              `}
            </pre>
            <div className="mt-4 text-blue-accent/80 font-mono text-sm tracking-widest uppercase pl-1">
              System Initialized
            </div>
          </div>
        ),
      },
      {
        type: "output",
        content: (
          <div className="mb-4 text-start text-gray-400">
            Welcome to the interactive terminal. Type{" "}
            <span className="text-green-400">'help'</span> to see available
            commands.
          </div>
        ),
      },
    ],
    [],
  );

  const { displayedLines, isTyping, isComplete } = useTerminalTyping({
    lines: terminalLines,
    typingSpeed: 60,
  });

  const handleInputFocus = () => {
    if (!isPaused && !isComplete) {
      setIsPaused(true);
      setIsInteractive(true);
    }
  };

  // Command definitions
  const commands: Record<
    string,
    { desc: string; action: () => string | JSX.Element | void }
  > = useMemo(
    () => ({
      whoami: {
        desc: "Display current user identity",
        action: () => "Belal Aboseada - Front-End Developer",
      },
      role: {
        desc: "Display current professional role",
        action: () => "Front-End / Full Stack / MERN Stack Developer",
      },
      about: {
        desc: "Display brief info about me",
        action: () =>
          "I build responsive and interactive web experiences with modern technologies and a focus on clean, maintainable code.",
      },
      projects: {
        desc: "View my projects (Navigates to Projects page)",
        action: () => {
          setTimeout(() => (window.location.href = "/projects"), 1000);
          return "Opening projects... (navigating to /projects)";
        },
      },
      contact: {
        desc: "Get in touch (Navigates to Contact page)",
        action: () => {
          setTimeout(() => (window.location.href = "/contact"), 1000);
          return "Opening contact page... (navigating to /contact)";
        },
      },
      logo: {
        desc: "Display the portfolio logo",
        action: () => (
          <div className="mt-2">
            <img
              src={logo}
              alt="Belal Portfolio Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
        ),
      },
      clear: {
        desc: "Clear the terminal screen",
        action: () => {
          setUserLines([]);
          setUserInput("");
          setShowInitialLines(false);
        },
      },
      resume: {
        desc: "Resume the intro animation",
        action: () => {
          setIsPaused(false);
          setIsInteractive(false);
          setUserInput("");
          setShowInitialLines(true);
        },
      },
      help: {
        desc: "Display this help message",
        action: () => {
          return (
            <div className="flex flex-col gap-1 mt-2 mb-2">
              <div className="text-gray-400 mb-2">Available commands:</div>
              {Object.entries(commands).map(([cmd, { desc }]) => (
                <div key={cmd} className="grid grid-cols-[120px_1fr] gap-4">
                  <span className="text-green-400 font-bold">{cmd}</span>
                  <span className="text-gray-300">: {desc}</span>
                </div>
              ))}
            </div>
          );
        },
      },
    }),
    [],
  );

  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      const input = userInput.trim();
      // Handle "cat filename" aliases manually or map them to commands
      let commandKey = input.toLowerCase();

      // Simple alias mapping
      if (commandKey === "cat role.txt") commandKey = "role";
      if (commandKey === "cat about.txt") commandKey = "about";
      if (commandKey === "cat logo.png") commandKey = "logo";
      if (commandKey === "ls projects/") commandKey = "projects";

      setUserLines((prev) => [...prev, { type: "command", content: input }]);

      let response: string | JSX.Element | void = "";

      if (commands[commandKey]) {
        response = commands[commandKey].action();
      } else {
        response = (
          <span>
            Command not found: <span className="text-red-400">{input}</span>.
            Type <span className="text-green-400">'help'</span> for available
            commands.
          </span>
        );
      }

      if (response !== undefined) {
        // If action returned void (like clear), don't push output
        // But for clear/resume we already handled state, so we might return nothing or null.
        // Let's ensure 'clear' and 'resume' return explicit void or null to avoid extra empty lines if needed.
        // However, 'clear' sets userLines to [], so we shouldn't append to it *after* clearing in the same tick if React batches.
        // Actually, if clear() is called, userLines becomes []. If we then set [...prev, output], it might be racey or just overwrite.
        // Ideally 'clear' should be special or we check if commandKey was 'clear'.
        if (commandKey !== "clear") {
          setUserLines((prev) => [
            ...prev,
            { type: "output", content: response as string | JSX.Element },
          ]);
        }
      }

      setUserInput("");
    }
  };

  const allLines = showInitialLines
    ? [...displayedLines, ...userLines]
    : userLines;

  // Auto focus input when becoming interactive
  useEffect(() => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInteractive]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center font-mono">
      {/* Glassy Background Lights */}
      <div
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full blur-[150px] z-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(196, 82%, 48%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full blur-[150px] z-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(240, 72%, 60%) 0%, transparent 70%)",
        }}
      />

      {/* Terminal Window Container with Glassmorphism */}
      <div className="relative z-10 w-full h-full  md:rounded-xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md bg-black/40 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-gray-400 text-xs ml-3 font-mono tracking-wider opacity-70">
              belal@portfolio:~
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-all text-gray-400 hover:text-white"
            title="Close Terminal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {allLines.map((line, index) => (
            <div key={index} className="terminal-line mb-2">
              {line.type === "command" ? (
                <div className="flex items-start text-green-400/90 drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]">
                  <span className="mr-3 select-none">$</span>
                  <span className="font-bold tracking-wide">
                    {line.content}
                  </span>
                  {index === displayedLines.length - 1 &&
                    isTyping &&
                    !isPaused && (
                      <span className="inline-block w-2.5 h-5 bg-green-400/80 ml-1 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                    )}
                </div>
              ) : (
                <div className="pl-6 text-blue-100/80 leading-relaxed max-w-4xl">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          <div className="terminal-line flex items-center mt-2 group">
            <span className="mr-3 text-green-400/90 select-none">$</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  handleInputFocus();
                }}
                onFocus={handleInputFocus}
                onKeyDown={handleUserInput}
                className="w-full bg-transparent border-none outline-none text-green-400/90 font-bold placeholder:text-white/20 placeholder:font-normal"
                placeholder={
                  isPaused
                    ? "Type 'help' for commands..."
                    : "Type here to pause & interact..."
                }
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </div>
          </div>

          {(isComplete || isInteractive) && (
            <div className="mt-8 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Link
                to="/projects"
                className="px-4 py-2 border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all rounded text-sm tracking-wide"
              >
                [View_My_Work]
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all rounded text-sm tracking-wide"
              >
                [Contact_Me]
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
