import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { requestVacancy } from "../api";
import { Contact } from "../components/base/Contact";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Pay } from "../components/Vacancy";

export async function loader(a: LoaderFunctionArgs) {
  const query = new URL(a.request.url).searchParams;
  const id = query.get("id");
  if (!id) return redirect("/vacancies") as never;

  const vacancy = await requestVacancy(parseInt(id));
  return { vacancy };
}

export default function Vacancy() {
  const { vacancy } = useLoaderData() as InferLoaderType<typeof loader>;
  return (
    <>
      <Header />
      <main className="px-4 my-3 max-w-7xl w-full mx-auto">
        <div className="flex flex-col justify-center md:justify-between md:flex-row md:items-center">
          <div>
            <div className="font-medium opacity-70 text-xl">
              г. {vacancy.city}
            </div>
            <h1 className="font-bold text-4xl my-3">{vacancy.job_name}</h1>
            <div className="font-bold text-2xl">
              <Pay pay={[vacancy.min_salary, vacancy.max_salary]} />
            </div>
          </div>
          <div className="font-medium text-right">
            <h2 className="text-xl mb-3">
              <Link to="" className="link">
                {vacancy.company_name}
              </Link>
            </h2>
            <span className="font-bold">Контактные данные:</span>
            <div>
              {(
                [vacancy.contact_email, vacancy.website].filter(
                  (c) => !!c
                ) as string[]
              ).map((c) => (
                <Contact contact={c} />
              ))}
            </div>
          </div>
        </div>
        <div className="card bg-base-200 p-4 h-fit shadow-xl mt-10">
          {vacancy.job_description}
        </div>
      </main>
      <Footer />
    </>
  );
}
