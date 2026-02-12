import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton/SecondaryButton.tsx";
import logo from "@assets/images/logo.svg";
import { APP_NAME, SLOGAN } from "@copy/general.ts";
import "./PublicLanding.scss";

const PublicLanding = () => {
  return (
    <main className="public-landing">
      <div className="public-landing__actions">
        <img src={logo} alt="logo" className="public-landing__logo" />
        <div className="public-landing__text">
          <h1 className="public-landing__title">{APP_NAME}</h1>
          <p className="public-landing__slogan">{SLOGAN}</p>
        </div>
        <PrimaryButton
          text={"Create Account"}
          onClick={(): void => {
            throw new Error("Function not implemented.");
          }}
        />
        <SecondaryButton
          text={"Login"}
          onClick={(): void => {
            throw new Error("Function not implemented.");
          }}
        />
        {/* ButtonStack goes here */}
      </div>
    </main>
  );
};

export default PublicLanding;
