export const endpoint = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";

export async function requestCaptcha() {
  const res = await fetch(`${endpoint}/api/requestcaptcha`);
  return await res.json();
}

export async function requestVacancies() {
  const res = await fetch(`${endpoint}/api/jobs?page=1&perpage=5`);
  return await res.json();
}
