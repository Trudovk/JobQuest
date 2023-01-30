import { Error } from "../components/base/Error";
import { Input } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Addcompany() {
  const errorMessage = new URLSearchParams(window.location.search).get("error");
  return (
    <>
      <Header />
      <section className="w-[400px] flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        {!!errorMessage && <Error message={errorMessage} className="mb-6" />}
        <h1 className="text-center font-bold text-2xl">Создание компании</h1>
        <form
          className="h-min flex flex-wrap"
          method="POST"
          action="/api/profile/createcompany"
        >
          <Input
            label="Компания:"
            placeholder="Название компании"
            type="text"
            name="company"
            required
          />
          <Input
            label="Email для обратной связи:"
            placeholder="Email"
            type="email"
            name="email"
            required
          />
          <Input
            label="Ссылка на сайт компании(не обязательно):"
            placeholder="Ссылка"
            type="text"
            name="website"
          />
          <Input
            label="О компании:"
            placeholder="Описание"
            type="textarea"
            name="description"
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
