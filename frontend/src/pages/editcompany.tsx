import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { requestCompany } from "../api";
import { Input, Textarea } from "../components/base/Input";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export async function loader(a: LoaderFunctionArgs) {
  const query = new URL(a.request.url).searchParams;
  const id = query.get("id");
  if (!id) return redirect("/lk") as never;

  const companyData = await requestCompany(parseInt(id));
  return { companyData };
}

export default function Editcompany() {
  const { companyData } = useLoaderData() as InferLoaderType<typeof loader>;
  return (
    <>
      <Header />
      <section className="w-[400px] flex h-fit	justify-center flex-col card bg-base-200 shadow-xl mx-auto my-6 p-8">
        <h1 className="text-center font-bold text-2xl mb-4">
          Изменение данных компании
        </h1>
        <form className="" method="POST" action="/api/profile/editcompany">
          <input type="hidden" name="id" value={companyData.id} />
          <Input
            label="Компания:"
            placeholder="Название компании"
            type="text"
            name="company"
            required={true}
            defaultValue={companyData.company_name}
          />
          <Input
            label="Веб-сайт:"
            placeholder="Веб-сайт"
            type="url"
            name="website"
            required={false}
            defaultValue={companyData.website ?? ""}
          />
          <Input
            label="Email:"
            placeholder="Email"
            type="email"
            name="email"
            required={true}
            defaultValue={companyData.contact_email}
          />
          <Textarea
            label="О компании:"
            placeholder="Описание"
            name="description"
            required={true}
            defaultValue={companyData.company_description}
          />
          <input
            type="submit"
            className="btn btn-outline mx-auto mt-3 w-full"
            value="Подтвердить"
          />
        </form>
        <form method="POST" action="/api/profile/deletecompany">
          <input type="hidden" name="id" value={companyData.id} />
          <button
            type="submit"
            className="btn mx-auto mt-3 btn-error bg-error/30 w-full"
          >
            Удалить компанию
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
