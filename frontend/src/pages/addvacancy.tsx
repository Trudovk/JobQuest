import { Input } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Addvacancy() {
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl">Создание вакансии</h1>
        <form className="h-min flex flex-wrap" method="POST" action="">
          <Input
            label="Должность:"
            placeholder="Должность"
            type="text"
            name="post"
            required
          />
          <Input
            label="Зарплата от:"
            placeholder="10000"
            type="number"
            name="pay"
          />
          <Input
            label="Зарплата до:"
            placeholder="20000"
            type="number"
            name="pay"
          />
          <Input
            label="Компания:"
            placeholder="Компания"
            type="text"
            name="company"
            required
          />
          <Input
            label="Описание:"
            placeholder="Описание"
            type="text"
            name="description"
            required
          />
          <Input
            label="Город:"
            placeholder="Город"
            type="text"
            name="city"
            required
          />
          <input
            type="submit"
            className="btn btn-outline mx-auto mt-6"
            value="Подтвердить"
          />
        </form>
      </section>
      <Footer />
    </>
  );
}
