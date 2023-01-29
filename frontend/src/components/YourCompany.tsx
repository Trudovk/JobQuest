type Props = {
  company: string;
  contacts: string[];
  description: string;
};

export const YourCompany: React.FC<Props> = (props) => {
  return (
    <div className="border-b border-neutral last:border-b-0 py-2">
      <h2 className="font-bold mb-2">{props.company}</h2>
      <div className="flex gap-2 ">
        <div className="">
          <div className="font-medium">Контакты компании:</div>
          <div>{props.contacts}</div>
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
