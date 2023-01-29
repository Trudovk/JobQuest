import { useId } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  name?: string;
  required?: boolean;
  value?: string;
};

export const Input: React.FC<Props> = (props) => {
  const id = useId();
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
      </label>
      <input
        id={id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        className="input input-bordered w-full max-w-xs"
        required={props.required}
        value={props.value}
      />
    </div>
  );
};
