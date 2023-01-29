import { useLoaderData } from "react-router-dom";
import { Error } from "../components/base/Error";
import { Input } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

// export async function loader() {
//   // make api request
//   return "api response";
// }

export default function Login() {
  return (
    <>
      <Header />
      <section className="w-96 flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        {/* <Error message="ПРЯЯЯЯЯЯЯЯЯЯЯЯ ЯЯЯЯЯЯЯЯЯ ЯЯЯНИК." /> */}
        <h1 className="text-center font-bold text-2xl">Вход</h1>
        <form className="h-min flex flex-wrap" method="POST" action="">
          <Input
            label="Email:"
            placeholder="example@example.com"
            type="email"
            name="email"
          />
          <Input
            label="Пароль:"
            placeholder="Пароль"
            type="password"
            name="password"
          />
          <input
            type="submit"
            className="btn btn-outline mx-auto mt-8"
            value="Войти"
          />
        </form>
      </section>
      <Footer />
    </>
  );
}
