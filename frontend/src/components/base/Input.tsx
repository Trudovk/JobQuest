import { useId } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type?:
    | "button"
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url";
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  key?: string;
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
        onChange={props.onChange}
        key={props.key}
      />
    </div>
  );
};

export const Textarea: React.FC<Props> = (props) => {
  const id = useId();

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
      </label>
      <textarea
        id={id}
        placeholder={props.placeholder}
        name={props.name}
        className="textarea textarea-bordered w-full max-w-xs resize-none"
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        key={props.key}
      />
    </div>
  );
};
