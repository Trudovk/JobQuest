import { useState } from "react";
import { Pagination } from "../components/base/Pagination";
import { CardFilter } from "../components/CardFilter";
import { CardVacancies } from "../components/CardVacancies";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Vacancies() {
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
          <CardVacancies />
        </div>
      </main>
      <Footer />
    </>
  );
}
