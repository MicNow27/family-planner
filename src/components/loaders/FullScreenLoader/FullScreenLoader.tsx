import logo from "@assets/images/logo.svg";
import "./FullScreenLoader.css";

const FullScreenLoader = () => (
  <div
    data-testid="full-screen-loader"
    className="fixed inset-0 flex items-center justify-center perspective-distant"
  >
    <img src={logo} alt="logo" className="logo-spin-3d h-36 w-36" />
  </div>
);

export default FullScreenLoader;
