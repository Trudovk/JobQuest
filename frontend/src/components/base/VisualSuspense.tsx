import style from "./VisualSuspense.module.css";

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

export const VisualSuspense: React.FC<Props> = (props) => {
  return (
    <div
      className={`rounded-xl from-base-300 to-base-100 shadow-lg ${style.suspense} ${props.className}`}
      style={{ width: props.width, height: props.height }}
    />
  );
};
