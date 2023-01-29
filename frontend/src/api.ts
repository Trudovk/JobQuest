export const endpoint = "http://127.0.0.1:5000";

export async function requestCaptcha() {
  const res = await fetch(`${endpoint}/api/requestcaptcha`);
  return await res.json();
}
