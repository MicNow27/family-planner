import errorPage from "@assets/images/errorPage.svg";
import { SOMETHING_WENT_WRONG } from "@copy/general.ts";
import { useLocation } from "react-router";

type ErrorPageProps = {
  messageProp?: string;
};

const ErrorPage = ({ messageProp }: ErrorPageProps) => {
  const location = useLocation();

  const message = location.state?.message ?? messageProp ?? SOMETHING_WENT_WRONG;

  return (
    <section className="max-w-form-w mx-auto flex flex-col items-center">
      <h1 className="text-primary-text mb-8 font-medium">{message}</h1>
      <img src={errorPage} alt="error" className="h-80" />
    </section>
  );
};

export default ErrorPage;
