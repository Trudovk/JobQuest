import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { requestVacancies } from "../api";
import { Pagination } from "../components/base/Pagination";
import { CardFilter } from "../components/CardFilter";
import { CardVacancies } from "../components/CardVacancies";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export async function loader() {
  // make api request
  return await requestVacancies();
}

export default function Vacancies() {
  const apiResponse = useLoaderData() as InferLoaderType<typeof loader>;
  const [page, setPage] = useState(1);
  return (
    <>
      <Header />
      <main className="flex gap-6 p-6 flex-wrap">
        <div className="h-fit md:sticky top-6 flex flex-col gap-3 items-center">
          <CardFilter />{" "}
          <Pagination
            currentPage={page}
            totalPages={100}
            onSwitch={(p) => setPage(p)}
          />
        </div>

        <div className="flex-grow basis-0">
          <CardVacancies vacancies={apiResponse.vacancies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
