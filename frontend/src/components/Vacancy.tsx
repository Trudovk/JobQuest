import { Link } from "react-router-dom";

export type Props = {
  id: number;
  post: string;
  pay: [number | null, number | null];
  company: string;
  company_id: number;
  description: string;
  city: string;
  owned?: boolean;
};

const payPrefix = (pay: [number | null, number | null]) => {
  if (!pay[0] && !pay[1]) return "Зарплата не указана";
  if (!pay[0]) return "до";
  if (!pay[1]) return "от";
  return "";
};

const whitespaceNumber = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const Pay = (p: { pay: Props["pay"] }) => {
  const pay = [
    payPrefix(p.pay),
    p.pay
      .filter((p) => !!p)
      .map((p) => `${whitespaceNumber(p as number)} ₽`)
      .join(" – "),
  ].join(" ");
  return <div className=" text-green-600 tracking-tight">{pay}</div>;
};

export const Vacancy: React.FC<Props> = (props) => {
  return (
    <div className="border-b border-neutral last:border-b-0 py-2">
      <div className="flex justify-between max-md:flex-col-reverse mb-2">
        <h2 className="font-bold text-xl">{props.post}</h2>
        <div>г. {props.city}</div>
      </div>
      <div className="flex gap-4 max-md:flex-col items-start">
        <div className="md:min-w-[10rem]">
          <div className="font-semibold max-md:text-lg">
            <Pay pay={props.pay} />
          </div>
          <Link to={`/companypage?id=${props.company_id}`} className="link">
            {props.company}
          </Link>
        </div>
        <p className="block flex-grow line-clamp-3">{props.description}</p>
        <div className="flex flex-col justify-between gap-2 max-md:w-full flex-shrink">
          {props.owned && (
            <Link to={`/editvacancy?id=${props.id}`} className="btn">
              Редактировать
            </Link>
          )}
          <Link to={`/vacancy?id=${props.id}`} className="btn">
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
};
