import { useState } from "react";
import { Input } from "./base/Input";
import { Pay } from "./Vacancy";

type Props = {
  pay?: [number | null, number | null];
};

export const EditVacancy: React.FC<Props> = (props) => {
  const defaultPay = props.pay ?? [null, null];
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
      <Input
        label="Название должности:"
        placeholder="Должность"
        type="text"
        name="post"
        required
      />
      <div className="flex gap-4">
        <Input
          label="Зарплата от:"
          placeholder="10000"
          type="number"
          name="payfrom"
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
          name="payto"
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
          <Pay pay={[pay.from, pay.to]} />
        </div>
      </div>
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
    </>
  );
};
