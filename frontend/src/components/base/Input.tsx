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
    | "week"
    | "textarea";
  name?: string;
  required?: boolean;
  value?: string;
};

export const Input: React.FC<Props> = (props) => {
  const id = useId();
  const Element = (p: any) =>
    props.type === "textarea" ? <textarea {...p} /> : <input {...p} />;

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
      </label>
      <Element
        id={id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        className={
          props.type === "textarea"
            ? "textarea textarea-bordered w-full max-w-xs resize-none"
            : "input input-bordered w-full max-w-xs"
        }
        required={props.required}
        value={props.value}
      />
    </div>
  );
};
