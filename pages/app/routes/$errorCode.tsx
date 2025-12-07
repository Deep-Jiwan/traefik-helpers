import { useParams } from "react-router";
import type { Route } from "./+types/$errorCode";
import ErrorPage from "../components/ErrorPage";

export function meta({ params }: Route.MetaArgs) {
  const errorCode = params.errorCode || '404';
  return [
    { title: `${errorCode} Error` },
    { name: "description", content: `Error ${errorCode} response page` },
  ];
}

export default function ErrorCodeRoute() {
  const { errorCode } = useParams();
  return <ErrorPage errorCode={errorCode || '404'} />;
}
