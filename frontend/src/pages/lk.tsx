import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { YourCompany } from "../components/YourCompany";
import { YourVacancy } from "../components/YourVacancy";

export default function Lk() {
  return (
    <>
      <Header />
      <main className="px-4 my-3">
        <div className="flex justify-between">
          <div>
            <h2 className="font-medium text-2xl">Пряник Пряничниковичков</h2>
            <div>example@examleple.com</div>
          </div>
          <div className="flex gap-3">
            <button className="btn">Создать вакансию</button>
            <button className="btn">Создать компанию</button>
          </div>
        </div>
        <div>
          <h2 className="my-4 font-bold">Ваши компании:</h2>
          <div className="card bg-base-200 p-4 h-fit">
            <YourCompany
              company="Пряник"
              contacts={["7 966 666 66 66", "example@example.com"]}
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
            />
            <YourCompany
              company="Пряник"
              contacts={["7 966 666 66 66", "example@example.com"]}
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
            />
            <YourCompany
              company="Пряник"
              contacts={["7 966 666 66 66", "example@example.com"]}
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
            />
            <YourCompany
              company="Пряник"
              contacts={["7 966 666 66 66", "example@example.com"]}
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
            />
          </div>
        </div>
        <div>
          <h2 className="my-4 font-bold">Ваши вакансии:</h2>
          <div className="card bg-base-200 p-4 h-fit">
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
            />
            <YourVacancy
              post="Менеджер по продажам"
              pay="1300$ - 1500$"
              company="КурсачКомпани"
              description="Exorcizamus te, omnis immundus spiritus, omnis satanica potestas, omnis incursio infernalis adversarii, omnis legio, omnis congregatio et secta diabolica, in nomine et virtute Domini Nostri Jesu + Christi, eradicare et effugare a Dei Ecclesia, ab animabus ad imaginem Dei conditis ac pretioso divini Agni sanguine redemptis + . "
              city="Москва"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
