import { Input, Textarea } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Editcompany() {
  return (
    <>
      <Header />
      <section className="w-[400px] flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl">
          Изменение данных компании
        </h1>
        <form className="h-min flex flex-wrap" method="POST" action="">
          <Input
            label="Компания:"
            placeholder="Название компании"
            type="text"
            name="company"
            required={true}
          />
          <Input
            label="Контакты:"
            placeholder="Контакты"
            type="text"
            name="contacts"
            required={true}
          />
          <Input
            label="Ссылка на сайт компании (не обязательно):"
            placeholder="Ссылка"
            type="url"
            name="link"
            required={true}
          />
          <Textarea
            label="О компании:"
            placeholder="Описание"
            name="description"
            required={true}
          />
          <input
            type="submit"
            className="btn btn-outline mx-auto mt-8"
            value="Подтвердить"
          />
          <button className="btn mx-auto mt-8 bg-red-600">
            Удалить компанию
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
