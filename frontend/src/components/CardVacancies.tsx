import { Vacancy } from "./Vacancy";

type Props = {
  vacancies: any;
};

export const CardVacancies: React.FC<Props> = (props) => {
  console.log(props.vacancies);
  return (
    <div className="card  h-96 bg-base-200 p-4 h-fit">
      {props.vacancies.map((p) => (
        <Vacancy
          post={p.job_name}
          pay={p.min_salary + "₽ - " + p.max_salary + "₽"}
          company="КурсачКомпани"
          description={p.job_description}
          city="Москва"
        />
      ))}
    </div>
  );
};
