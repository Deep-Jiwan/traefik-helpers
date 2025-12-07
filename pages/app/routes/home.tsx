import type { Route } from "./+types/home";
import ErrorPage from "../components/ErrorPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found" },
    { name: "description", content: "Error response page" },
  ];
}

export default function Home() {
  return <ErrorPage errorCode="404" />;
}
