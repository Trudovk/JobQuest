import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

// export const endpoint = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";
export const endpoint = "";

const serialize = (obj: Record<string, string | number>) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export type CompanyType = {
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

export type VacancyExtendedType = VacancyType & {
  company_name: string;
  contact_email: string;
  website: string;
};

export type PaginationType = {
  entries: number;
  page: number;
  pages: number;
  perpage: number;
};

export type ErrorResponseType = {
  error: string;
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

async function makeRequest<T, B extends boolean | undefined>(
  path: string,
  ignoreSession?: B
): Promise<B extends true ? T | ErrorResponseType : T> {
  const invalidSession = () => {
    delete_cookie("session"); // problematic!
    redirect("/login?error=Сессия истекла, войдите снова");
  };

  const res = await fetch(`${endpoint}${path}`);
  try {
    const response = await res.json();
    console.log(`Requested "${path}", got: `, response);
    if ("error" in response && response.error === "session invalid") {
      if (typeof ignoreSession !== "undefined" && ignoreSession === true)
        return response;

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
): [number, (p: number) => void, T | null, () => void] {
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

  const forceRefresh = () => setPageWrap(page, true);

  return [page, setPageWrap, result, forceRefresh];
}

export async function requestCaptcha() {
  return await makeRequest<
    {
      hash: string;
      link: string;
    },
    false
  >(`${endpoint}/api/requestcaptcha`);
}

export async function requestVacancies(
  page: number,
  perpage: number,
  companyId?: number,
  search?: string,
  salary?: [number | null, number | null]
) {
  return await makeRequest<
    {
      pagination: PaginationType;
      vacancies: VacancyType[];
    },
    false
  >(
    // `${endpoint}/api/jobs?page=${page}&perpage=${perpage}&${
    //   !!companyId ? `recruiter=${companyId}` : ""
    // }`
    `${endpoint}/api/jobs?${serialize({
      page,
      perpage,
      ...(companyId ? { companyId } : {}),
      ...(search ? { search } : {}),
      ...(salary && salary[0] !== null ? { minsal: salary[0] } : {}),
      ...(salary && salary[1] !== null ? { maxsal: salary[1] } : {}),
    })}`
  );
}

export async function requestVacancy(id: number) {
  return await makeRequest<VacancyExtendedType, false>(
    `${endpoint}/api/vacancy/${id}`
  );
}

export async function requestOwnedCompanies() {
  return await makeRequest<CompanyType[], false>(
    `${endpoint}/api/profile/companies`
  );
}

export async function requestProfile() {
  return await makeRequest<
    {
      email: string;
      id: number;
      first_name: string;
      last_name: string;
    },
    true
  >(`${endpoint}/api/profile`, true);
}

export async function requestCompany(id: number) {
  return await makeRequest<CompanyType, false>(`${endpoint}/api/company/${id}`);
}

export async function userOwnsCompany(companyId: number) {
  const user = await requestProfile();
  if (!("id" in user)) return false;
  const companyOwner = (await requestCompany(companyId)).owner_id;
  return user.id === companyOwner;
}
