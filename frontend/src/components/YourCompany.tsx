import { Link } from "react-router-dom";

type Props = {
  id: number;
  company: string;
  contacts: string[];
  description: string;
};

export const YourCompany: React.FC<Props> = (props) => {
  return (
    <div className="border-b border-neutral last:border-b-0 py-2">
      <h2 className="font-bold mb-2">{props.company}</h2>
      <div className="flex gap-2">
        <div className="">
          <div className="font-medium">Контакты компании:</div>
          <div>
            {props.contacts.map((c) => (
              <a
                className="link link-accent block"
                href={(c.includes("@") ? "mailto:" : "") + c}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
        <p className="block flex-grow">{props.description}</p>
        <div className="flex flex-col justify-between gap-2">
          <Link to={`/editcompany?id=${props.id}`} className="btn">
            Редактировать
          </Link>
          <Link to={`/companypage?id=${props.id}`} className="btn">
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
};
