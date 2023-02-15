import { Link, useLoaderData } from "react-router-dom";
import { requestOwnedCompanies, requestProfile } from "../api";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { YourCompany } from "../components/YourCompany";

export async function loader() {
  const companies = await requestOwnedCompanies();
  const profile = await requestProfile();
  return { companies, profile };
}

export default function Lk() {
  const { profile, companies } = useLoaderData() as InferLoaderType<
    typeof loader
  >;
  return (
    <>
      <Header />
      <main className="px-4 my-3 w-full max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-3xl">
              {profile.first_name} {profile.last_name}
            </h2>
            <div>{profile.email}</div>
            <form action="/api/invalidatesession" method="post">
              <button type="submit" className="btn btn-error mt-4">
                Выход
              </button>
            </form>
          </div>
          <div className="flex gap-3">
            <Link to="/addvacancy" className="btn">
              Создать вакансию
            </Link>
            <Link to="/addcompany" className="btn">
              Создать компанию
            </Link>
          </div>
        </div>
        <div>
          <h2 className="my-4 font-bold">Ваши компании:</h2>
          <div className="card bg-base-200 px-4 py-2 h-fit shadow-lg">
            {companies.map((c) => (
              <YourCompany
                id={c.id}
                company={c.company_name}
                contacts={
                  [c.contact_email, c.website].filter((c) => !!c) as string[]
                }
                description={c.company_description}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <h2 className="my-4 font-bold">Ваши вакансии:</h2>
          <div className="card bg-base-200 p-4 h-fit">
            <Vacancy
              post="Менеджер по продажам"
              pay={[130000, 150000]}
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
              owned
            />
          </div>
        </div> */}
      </main>
      <Footer />
    </>
  );
}
