import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { YourCompany } from "../components/YourCompany";
import { YourVacancy } from "../components/YourVacancy";

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main className="px-4 my-3">
        <div className="flex justify-between">
          <div>
            <h2 className="font-medium text-2xl">Компания: Пряник</h2>
            <div>
              <span className="font-medium">Контакты компании: </span> 7 966 666
              66 66
            </div>
            <a className="link">Сыллка</a>
          </div>
          <button className="btn">Изменить данные компании</button>
        </div>
        <p>
          <span className="font-medium">О компании: </span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div>
          <h2 className="my-4 font-bold">Ваши вакансии:</h2>
          <div className="card bg-base-200 p-4 h-fit">
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + ."
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + ."
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + ."
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + ."
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + ."
              city="Москва"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
