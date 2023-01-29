import { useLoaderData } from "react-router-dom";

export async function loader() {
  // make api request
  return "api response";
}

export default function Login() {
  const apiResponse = useLoaderData() as InferLoaderType<typeof loader>;
  return <>login, loader gave {apiResponse}</>;
}
