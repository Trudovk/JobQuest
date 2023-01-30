// export const endpoint = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";
export const endpoint = "";

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

async function makeRequest(path: string) {
  const invalidSession = () => {
    delete_cookie("session");
    window.location.href = "/login?error=Сессия истекла, войдите снова";
  };

  const res = await fetch(`${endpoint}${path}`);
  try {
    const response = await res.json();
    console.log(`Requested "${path}", got: `, response);
    if ("error" in response && response.error === "session invalid") {
      return invalidSession();
    }
    return response;
  } catch (e) {
    return invalidSession();
  }
}

export async function requestCaptcha() {
  return await makeRequest(`${endpoint}/api/requestcaptcha`);
}

export async function requestVacancies() {
  return await makeRequest(`${endpoint}/api/jobs?page=1&perpage=5`);
}

export async function requestOwnedCompanies() {
  return await makeRequest(`${endpoint}/api/profile/companies`);
}

export async function requestProfile() {
  return await makeRequest(`${endpoint}/api/profile`);
}
