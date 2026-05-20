import pageNotFound from "@assets/images/pageNotFound.svg";
import { PAGE_NOT_FOUND } from "@copy/general.ts";

const PageNotFound = () => (
  <section className="max-w-form-w mx-auto">
    <h1 className="text-primary-text mb-8 font-medium">{PAGE_NOT_FOUND}</h1>
    <img src={pageNotFound} alt="404" className="h-80" />
  </section>
);

export default PageNotFound;
