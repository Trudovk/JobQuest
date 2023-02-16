import { useLoaderData } from "react-router-dom";
import { requestOwnedCompanies } from "../api";
import { Error } from "../components/base/Error";
import { Input } from "../components/base/Input";
import { EditVacancy } from "../components/EditVacancy";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export async function loader() {
  const companies = await requestOwnedCompanies();
  return { companies };
}

export default function Addvacancy() {
  const { companies } = useLoaderData() as InferLoaderType<typeof loader>;

  const urlparams = new URLSearchParams(window.location.search);
  const errorMessage = urlparams.get("error");
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        {!!errorMessage && <Error message={errorMessage} className="mb-6" />}
        <h1 className="text-center font-bold text-2xl mb-4">
          Создание вакансии
        </h1>
        <form
          className="h-min flex flex-wrap"
          method="POST"
          action="/api/profile/createvacancy"
          // action="//httpbin.org/post"
        >
          <EditVacancy companies={companies} />
        </form>
      </section>
      <Footer />
    </>
  );
}
