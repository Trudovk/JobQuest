import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

// export const endpoint = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";
export const endpoint = "";

type CompanyType = {
  company_description: string;
  company_name: string;
  contact_email: string;
  id: number;
  owner_id: number;
  website: string | null;
};

export type VacancyType = {
  id: number;
  job_name: string;
  job_description: string;
  company_name: string;
  min_salary: number | null;
  max_salary: number | null;
  city: string;
  recruiter_id: number;
};

export type PaginationType = {
  entries: number;
  page: number;
  pages: number;
  perpage: number;
};

function get_cookie(name: string) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

function delete_cookie(name: string, path?: string, domain?: string) {
  if (get_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

async function makeRequest<T>(path: string): Promise<T> {
  const invalidSession = () => {
    delete_cookie("session");
    redirect("/login?error=Сессия истекла, войдите снова");
  };

  const res = await fetch(`${endpoint}${path}`);
  try {
    const response = await res.json();
    console.log(`Requested "${path}", got: `, response);
    if ("error" in response && response.error === "session invalid") {
      return invalidSession() as never;
    }
    return response as T;
  } catch (e) {
    return invalidSession() as never;
  }
}

export function usePagination<T extends { pagination: PaginationType }>(
  request: (p: number) => Promise<T>,
  currentPage: number,
  onChangedPage?: (p: number) => unknown
): [number, (p: number) => void, T | null] {
  const [page, setPage] = useState(currentPage);
  const [result, setResult] = useState<T | null>(null);

  const setPageWrap = (p: number, first_time?: boolean) => {
    if (!first_time && !result) return;
    setResult(null);
    setPage(p);
    request(p).then((d) => {
      setResult(d);
      if (onChangedPage) onChangedPage(p);
    });
  };

  useEffect(() => {
    setPageWrap(currentPage, true);
  }, []);

  return [page, setPageWrap, result];
}

export async function requestCaptcha() {
  return await makeRequest<{
    hash: string;
    link: string;
  }>(`${endpoint}/api/requestcaptcha`);
}

export async function requestVacancies(
  page: number,
  perpage: number,
  companyId?: number
) {
  return await makeRequest<{
    pagination: PaginationType;
    vacancies: VacancyType[];
  }>(
    `${endpoint}/api/jobs?page=${page}&perpage=${perpage}&${
      !!companyId ? `recruiter=${companyId}` : ""
    }`
  );
}

export async function requestOwnedCompanies() {
  return await makeRequest<CompanyType[]>(`${endpoint}/api/profile/companies`);
}

export async function requestProfile() {
  return await makeRequest<{
    email: string;
    id: number;
    first_name: string;
    last_name: string;
  }>(`${endpoint}/api/profile`);
}

export async function requestCompany(id: number) {
  return await makeRequest<CompanyType>(`${endpoint}/api/company/${id}`);
}

export async function userOwnsCompany(companyId: number) {
  const userId = (await requestProfile()).id;
  const companyOwner = (await requestCompany(companyId)).owner_id;
  return userId === companyOwner;
}
