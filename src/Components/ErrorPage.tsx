import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  interface HttpError extends Error {
    statusText?: string;
  }

  const unknownError = useRouteError();
  let error: HttpError;

  if (unknownError instanceof Error) error = unknownError as HttpError;
  else {
    console.error("Unexpected error type:", unknownError);
    return <div>Unexpected Error</div>;
  }
  console.error(error);

  return (
    <div id="errorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
