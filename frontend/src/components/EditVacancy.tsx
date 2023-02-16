import { useState } from "react";
import { Input, Select } from "./base/Input";
import { Pay } from "./Vacancy";
import type { CompanyType } from "../api";

type Props = {
  companies: CompanyType[];
  id?: number;
  defaults?: {
    job_name: string;
    min_salary: number | null;
    max_salary: number | null;
    description: string;
    city?: string;
    company_id: number;
  };
};

export const EditVacancy: React.FC<Props> = (props) => {
  const defaultPay = [
    props.defaults?.min_salary ?? null,
    props.defaults?.max_salary ?? null,
  ];
  const [pay, setPay] = useState({ from: defaultPay[0], to: defaultPay[1] });

  const parsePay = (p: string) => {
    const n = parseInt(p);
    if (isNaN(n)) return null;

    if (n < 1) return null;
    if (n > 100_000_000) return null;
    return n;
  };
  return (
    <>
      {!!props.id && <input type="hidden" value={props.id} name="id" />}
      <Input
        label="Название должности:"
        placeholder="Должность"
        type="text"
        name="job_name"
        defaultValue={props.defaults?.job_name}
        required
      />
      <div className="flex gap-4">
        <Input
          label="Зарплата от:"
          placeholder="10000"
          type="number"
          name="min_salary"
          key="payfrom"
          onChange={(e) =>
            setPay((o) => ({
              ...o,
              from: parsePay(e.target.value),
            }))
          }
          value={String(pay.from ?? "")}
        />
        <Input
          label="Зарплата до:"
          placeholder="20000"
          type="number"
          name="max_salary"
          key="payto"
          onChange={(e) =>
            setPay((o) => ({
              ...o,
              to: parsePay(e.target.value),
            }))
          }
          value={String(pay.to ?? "")}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <div className="label">
          Предпросмотр:
          <div className="font-bold">
            <Pay pay={[pay.from, pay.to]} />
          </div>
        </div>
      </div>
      <Select
        label="Компания:"
        placeholder="Компания"
        type="text"
        name="company_id"
        defaultValue={props.defaults?.company_id ?? ""}
        options={Object.fromEntries(
          props.companies.map((c) => [c.id, c.company_name])
        )}
        required
      />
      <Input
        label="Описание:"
        placeholder="Описание"
        type="text"
        name="description"
        defaultValue={props.defaults?.description}
        required
      />
      <Input
        label="Город:"
        placeholder="Город"
        type="text"
        name="city"
        defaultValue={props.defaults?.city}
        required
      />
      <input
        type="submit"
        className="btn btn-outline mx-auto mt-6 w-full"
        value="Подтвердить"
      />
    </>
  );
};
