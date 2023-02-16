import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { requestOwnedCompanies, requestVacancy } from "../api";
import { Input } from "../components/base/Input";
import { EditVacancy } from "../components/EditVacancy";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export async function loader(a: LoaderFunctionArgs) {
  const query = new URL(a.request.url).searchParams;
  const id = query.get("id");
  if (!id) return redirect("/lk") as never;

  const companies = await requestOwnedCompanies();
  const vacancy = await requestVacancy(parseInt(id));
  return { companies, vacancy, id };
}

export default function Editvacancy() {
  const { companies, vacancy, id } = useLoaderData() as InferLoaderType<
    typeof loader
  >;
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl mb-4">
          Изменение вакансии
        </h1>
        <form
          className="h-min flex flex-wrap"
          method="POST"
          action="/api/profile/editvacancy"
        >
          <EditVacancy
            companies={companies}
            id={parseInt(id)}
            defaults={{
              job_name: vacancy.job_name,
              description: vacancy.job_description,
              city: vacancy.city,
              company_id: vacancy.recruiter_id,
              min_salary: vacancy.min_salary,
              max_salary: vacancy.max_salary,
            }}
          />
        </form>
        <form method="POST" action="/api/profile/deletevacancy">
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="btn mx-auto mt-3 btn-error bg-error/30 w-full"
          >
            Удалить вакансию
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
