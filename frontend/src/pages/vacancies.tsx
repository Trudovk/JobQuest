import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { requestVacancies, usePagination } from "../api";
import { Pagination } from "../components/base/Pagination";
import { VisualSuspense } from "../components/base/VisualSuspense";
import { CardFilter, SearchState } from "../components/CardFilter";
import { CardVacancies } from "../components/CardVacancies";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

// export async function loader() {
//   // make api request
//   // return await );
// }

export default function Vacancies() {
  // const apiResponse = useLoaderData() as InferLoaderType<typeof loader>;
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    min_salary: null,
    max_salary: null,
  });

  const [page, setPage, result, refresh] = usePagination(
    (p) =>
      requestVacancies(p, 7, undefined, searchState.searchQuery, [
        searchState.min_salary,
        searchState.max_salary,
      ]),
    1
  );

  useEffect(() => {
    if (!!result) refresh();
  }, [searchState]);

  return (
    <>
      <Header />
      <main className="flex gap-6 p-6 flex-wrap justify-center flex-grow">
        <div className="h-fit lg:sticky top-6 flex flex-col gap-3 items-center flex-shrink">
          <CardFilter
            stateValue={searchState}
            setState={setSearchState}
            searchLoading={!result}
          />
          {!result && <VisualSuspense width="16rem" height="3rem" />}
          {!!result && (
            <Pagination
              currentPage={page}
              totalPages={result.pagination.pages}
              onSwitch={(p) => setPage(p)}
            />
          )}
        </div>

        <div className="flex-grow basis-0">
          {!result && <VisualSuspense width="100%" height="100%" />}
          {!!result && <CardVacancies vacancies={result.vacancies} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
