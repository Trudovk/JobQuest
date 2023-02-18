import { useState } from "react";

type Props = {
  onChange: (r: [number | null, number | null]) => void;
};

export const SalaryRange: React.FC<Props> = (props) => {
  const [range, setRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  return (
    <div>
      <input
        type="number"
        min="0"
        max="10000000"
        value="40"
        className="range range-success"
      />
      <input
        type="number"
        min="0"
        max="10000000"
        value="30"
        className="range range-success"
      />
    </div>
  );
};
