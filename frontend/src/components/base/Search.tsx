import { useEffect, useState } from "react";

type Props = {
  onSearch: (q: string) => void;
  onDebounce: (q: string) => void;
  showLoading: boolean;
  debounceMs?: number;
};

export const Search: React.FC<Props> = (props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("fired");
    const timer = setTimeout(() => {
      props.onDebounce(query);
    }, props.debounceMs ?? 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Поиск…"
          className="input input-bordered w-full"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button
          className={`btn btn-square ${props.showLoading ? "loading" : ""}`}
          onClick={() => props.onSearch(query)}
        >
          {!props.showLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
