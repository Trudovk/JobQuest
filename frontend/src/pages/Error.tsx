import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : "Unknown error";

  const errorStacktrace =
    typeof error === "object" &&
    error !== null &&
    "stack" in error &&
    typeof error.stack === "string"
      ? error.stack
      : "No stacktrace available";

  return (
    <div className="max-w-xl mx-auto py-16 px-3">
      <div className="font-bold text-2xl mb-4">
        Извините, произошла ошибка :(
      </div>
      <Link className="btn" to={"/"}>
        Вернуться на главную
      </Link>
      <details>
        <summary className="my-4 font-bold underline cursor-pointer">
          Детали ошибки
        </summary>
        <div className="p-3 rounded-xl bg-error text-error-content font-mono">
          <div className="mb-3 mx-2">{errorMessage}</div>
          <div className="p-2 rounded-xl bg-white leading-5">
            {errorStacktrace.split("\n").map((l) => (
              <p className="my-1">{l}</p>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
