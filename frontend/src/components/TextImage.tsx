type Props = {
  title: string;
  image: string;
  text: string;
  position: "left" | "right";
};

export const TextImage: React.FC<Props> = (props) => {
  const image = (
    <img
      src={props.image}
      className="h-36 w-36 flex-shrink-0 object-cover p-4"
    />
  );
  return (
    <div className="flex items-center gap-6 my-10">
      {props.position === "left" && image}
      <div className="flex-grow">
        <h2 className=" text-4xl font-bold mb-5">{props.title}</h2>
        <p>{props.text}</p>
      </div>
      {props.position === "right" && image}
    </div>
  );
};
