import { Input } from "../components/base/Input";
import { EditVacancy } from "../components/EditVacancy";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Editvacancy() {
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl">Изменение вакансии</h1>
        <form className="h-min flex flex-wrap" method="POST" action="">
          <EditVacancy />
        </form>
      </section>
      <Footer />
    </>
  );
}
