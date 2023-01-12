import {
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export const Search: FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent): void => {
      if (!input.current) {
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        input.current.focus();
      } else if (e.key === "Escape") {
        input.current.blur();
      }
    };
    window.addEventListener("keydown", down);
    return () => {
      window.removeEventListener("keydown", down);
    };
  });
  const handleKeyDown = useCallback(
    <T,>(e: KeyboardEvent<T>) => {
      switch (e.key) {
        case "Enter":
          finishSearch();
      }
    },
    [search]
  );
  const finishSearch = () => {
    input.current?.blur();
    setSearch("");
    navigate(`/channels/@${search.trim().toLowerCase()}`);
  };
  return (
    <div className="w-full h-full bg-transparent appearance-none text-lg flex justify-end items-center relative">
      <input
        spellCheck={false}
        ref={input}
        className="w-full absolute pl-2 h-full bg-transparent appearance-none placeholder:dark:text-zinc-950 placeholder:text-white placeholder:text-opacity-50 placeholder:dark:text-opacity-50"
        placeholder="Search streamer"
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          const { value } = e.target;
          setSearch(value);
        }}
        value={search}
      ></input>
      <kbd className="hidden sm:block font-mono border-white dark:border-zinc-950 border-2 mr-1.5 px-2">
        /
      </kbd>
    </div>
  );
};
