import { useLoaderData } from "react-router-dom";
import { endpoint, requestCaptcha } from "../api";
import { Input } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export async function loader() {
  // make api request
  return await requestCaptcha();
}

export default function Registration() {
  const apiResponse = useLoaderData() as InferLoaderType<typeof loader>;
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl">Регистрация</h1>
        <form className="h-min flex flex-wrap" method="POST" action="">
          <Input
            label="Email:"
            placeholder="example@example.com"
            type="email"
            name="email"
            required={true}
          />
          <Input
            label="Имя:"
            placeholder="Имя"
            type="text"
            name="first-name"
            required={true}
          />
          <Input
            label="Фамилия:"
            placeholder="Фамилия"
            type="text"
            name="last-Name"
            required={true}
          />
          <Input
            label="Пароль:"
            placeholder="Пароль"
            type="password"
            name="password"
            required={true}
          />
          <Input
            label="Повторите пароль:"
            placeholder="Пароль"
            type="password"
            name="passwordconfirm"
            required={true}
          />
          <div className="flex gap-4 items-center">
            <Input
              label="Цифры с картинки:"
              placeholder="Цифры с картинки"
              type="text"
              name="captcha"
              required={true}
            />
            <img
              src={endpoint + apiResponse.link}
              alt="captcha"
              className="rounded-md flex-shrink-0 w-36"
            />
          </div>
          <input type="hidden" name="captcha-hash" value={apiResponse.hash} />
          <input
            type="submit"
            className="btn btn-outline mx-auto mt-8"
            value="Зарегистрироваться"
          />
        </form>
      </section>
      <Footer />
    </>
  );
}
