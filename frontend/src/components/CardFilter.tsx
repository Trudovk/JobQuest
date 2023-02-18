import { useState } from "react";
import { Search } from "./base/Search";

export type SearchState = {
  searchQuery: string;
  min_salary: number | null;
  max_salary: number | null;
};
type Props = {
  stateValue: SearchState;
  setState: (s: SearchState | ((s: SearchState) => SearchState)) => unknown;
  searchLoading?: boolean;
};

export const CardFilter: React.FC<Props> = (props) => {
  return (
    <div className="card w-[330px] h-fit bg-base-200 shadow-lg">
      <div className="p-4">
        <Search
          onDebounce={(q) => props.setState((p) => ({ ...p, searchQuery: q }))}
          onSearch={(q) => props.setState((p) => ({ ...p, searchQuery: q }))}
          showLoading={props.searchLoading ?? false}
        />
      </div>
    </div>
  );
};
