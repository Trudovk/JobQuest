import { VacancyType } from "../api";
import { Vacancy } from "./Vacancy";

type Props = {
  vacancies: VacancyType[];
};

export const CardVacancies: React.FC<Props> = (props) => {
  return (
    <div className="card bg-base-200 px-4 py-2 h-fit shadow-xl">
      {props.vacancies.map((p) => (
        <Vacancy
          id={p.id}
          post={p.job_name}
          pay={[p.min_salary, p.max_salary]}
          company={p.company_name}
          company_id={p.recruiter_id}
          description={p.job_description}
          city={p.city}
          key={p.id}
        />
      ))}
    </div>
  );
};
