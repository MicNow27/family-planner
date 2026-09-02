import errorPage from "@assets/images/errorPage.svg";
import { SOMETHING_WENT_WRONG } from "@copy/general.ts";
import { useLocation } from "react-router";

const ErrorPage = () => {
  const location = useLocation();

  const message = location.state?.message ?? SOMETHING_WENT_WRONG;

  return (
    <section className="max-w-form-w mx-auto flex flex-col items-center">
      <h1 className="text-primary-text mb-8 text-center font-medium">{message}</h1>
      <img src={errorPage} alt="error" className="h-80" />
    </section>
  );
};

export default ErrorPage;
