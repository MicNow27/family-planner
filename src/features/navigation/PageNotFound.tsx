import pageNotFound from "@assets/images/pageNotFound.svg";

const PageNotFound = () => (
  <>
    <h1>Page not found</h1>
    <img src={pageNotFound} alt="404" className="h-60" />
  </>
);

export default PageNotFound;
