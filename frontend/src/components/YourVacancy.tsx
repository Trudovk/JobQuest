type Props = {
  post: string;
  pay: string;
  company: string;
  description: string;
  city: string;
};

export const YourVacancy: React.FC<Props> = (props) => {
  return (
    <div className="border-b border-neutral last:border-b-0 py-2">
      <div className="flex justify-between mb-2">
        <h2 className="font-bold">{props.post}</h2>
        <div>г. {props.city}</div>
      </div>
      <div className="flex gap-2 ">
        <div className="">
          <div className="font-medium text-green-600">{props.pay}</div>
          <div>{props.company}</div>
        </div>
        <p className="block flex-grow">{props.description}</p>
        <div className="flex flex-col justify-between gap-2">
          <button className="btn">Редактировать</button>
          <button className="btn">Перейти</button>
        </div>
      </div>
    </div>
  );
};
