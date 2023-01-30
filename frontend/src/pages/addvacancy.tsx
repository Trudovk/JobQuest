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
            required={true}
          />
          <Input
            label="Зарплата:"
            placeholder="Зарплата"
            type="text"
            name="pay"
            required={true}
          />
          <Input
            label="Компания:"
            placeholder="Компания"
            type="text"
            name="company"
            required={true}
          />
          <Input
            label="Описание:"
            placeholder="Описание"
            type="text"
            name="description"
            required={true}
          />
          <Input
            label="Город:"
            placeholder="Город"
            type="text"
            name="city"
            required={true}
          />
          <input
            type="submit"
            className="btn btn-outline mx-auto"
            value="Подтвердить"
          />
        </form>
      </section>
      <Footer />
    </>
  );
}
