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
  defaultValue?: string | number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  key?: string;
};

export const Input: React.FC<Props> = (props) => {
  const id = useId();

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
        {props.required && (
          <span className="label-text-alt text-error text-lg leading-none">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        className="input input-bordered w-full"
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        key={props.key}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export const Textarea: React.FC<Props> = (props) => {
  const id = useId();

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
        {props.required && (
          <span className="label-text-alt text-error text-lg leading-none">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        placeholder={props.placeholder}
        name={props.name}
        className="textarea textarea-bordered w-full resize-none"
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        key={props.key}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export const Select: React.FC<
  Props & {
    options: { [k: string]: string };
  }
> = (props) => {
  const id = useId();

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text">{props.label}</span>
        {props.required && (
          <span className="label-text-alt text-error text-lg leading-none">
            *
          </span>
        )}
      </label>
      <select
        id={id}
        name={props.name}
        placeholder={props.placeholder}
        className="select select-bordered w-full"
        required={props.required}
        value={props.value}
        key={props.key}
      >
        {/* {!!props.placeholder && (
          <option
            disabled
            selected={
              !(!!props.defaultValue && props.defaultValue in props.options)
            }
          >
            {props.placeholder}
          </option>
        )} */}
        {Object.keys(props.options).map((k) => (
          <option value={k} selected={props.defaultValue == k}>
            {props.options[k]}
          </option>
        ))}
      </select>
    </div>
  );
};
