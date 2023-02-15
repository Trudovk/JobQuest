import { useLoaderData } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Pay } from "../components/Vacancy";

export async function loader() {
  // make api request
  return "api response";
}

export default function Vacancy() {
  //   const apiResponse = useLoaderData() as InferLoaderType<typeof loader>;
  return (
    <>
      {/* login, loader gave {apiResponse} */}
      <Header />
      <main className="px-4 my-3 max-w-full">
        <div className="flex justify-between">
          <div>
            <h1 className="text-center font-bold text-2xl">Вакансия</h1>
            <h2 className="font-medium text-gray-400">Наз компании</h2>
            <div className="font-medium">Контактные данные:</div>
            <div className="font-light">Контакты</div>
          </div>
          <div>
            <Pay pay={[2, 3]} />
            <div className="font-light text-gray-400">Город</div>
          </div>
        </div>
        <div className="card bg-base-200 p-4 h-fit shadow-xl">
          Описание Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Incidunt alias, architecto corrupti officia provident hic optio
          eveniet, officiis mollitia et, odit velit voluptatum ut culpa quod
          consequuntur necessitatibus cum omnis. Описание Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Incidunt alias, architecto corrupti
          officia provident hic optio eveniet, officiis mollitia et, odit velit
          voluptatum ut culpa quod consequuntur necessitatibus cum omnis.
          Описание Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Incidunt alias, architecto corrupti officia provident hic optio
          eveniet, officiis mollitia et, odit velit voluptatum ut culpa quod
          consequuntur necessitatibus cum omnis.
        </div>
      </main>
      <Footer />
    </>
  );
}
