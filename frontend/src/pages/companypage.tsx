import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { requestCompany, requestVacancies, userOwnsCompany } from "../api";
import { Contact } from "../components/base/Contact";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Vacancy } from "../components/Vacancy";

export async function loader(a: LoaderFunctionArgs) {
  const query = new URL(a.request.url).searchParams;
  const id = query.get("id");
  if (!id) return redirect("/vacancies") as never;

  const companyData = await requestCompany(parseInt(id));
  const vacancies = await requestVacancies(1, 100, parseInt(id));
  const userOwns = await userOwnsCompany(parseInt(id));
  return { companyData, vacancies, userOwns };
}

export default function CompanyPage() {
  const { companyData, vacancies, userOwns } =
    useLoaderData() as InferLoaderType<typeof loader>;
  return (
    <>
      <Header />
      <main className="px-4 my-3">
        <div className="flex justify-between">
          <div>
            <h2 className="font-medium text-2xl">{companyData.company_name}</h2>
            <div>
              <h3 className="font-medium">Контакты компании:</h3>
              {(
                [companyData.contact_email, companyData.website].filter(
                  (c) => !!c
                ) as string[]
              ).map((c) => (
                <Contact contact={c} />
              ))}
            </div>
          </div>
          {userOwns && (
            <button className="btn">Изменить данные компании</button>
          )}
        </div>
        <h3 className="font-medium">О компании:</h3>
        <p>{companyData.company_description}</p>
        <div>
          <h2 className="my-4 font-bold">Вакансии компании:</h2>
          <div className="card bg-base-200 p-4 h-fit">
            {vacancies.vacancies.map((v) => (
              <Vacancy
                post={v.job_name}
                pay={[v.min_salary, v.max_salary]}
                company={v.company_name}
                company_id={v.recruiter_id}
                description={v.job_description}
                city={v.city}
                owned={userOwns}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
