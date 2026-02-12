import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton/SecondaryButton.tsx";
import family from "@assets/images/family.svg";
import logo from "@assets/images/logo.svg";
import { APP_NAME, SLOGAN } from "@copy/general.ts";
import "./PublicLanding.scss";
import { LOGIN, SIGN_UP } from "@copy/publicLanding.ts";

const PublicLanding = () => (
  <main className="public-landing">
    <div className="public-landing__hero">
      <img src={family} alt="family" className="public-landing__hero__img" />
    </div>
    <div className="public-landing__actions">
      <div className="public-landing__actions__content">
        <img src={logo} alt="logo" className="public-landing__logo" />
        <div className="public-landing__text">
          <h1 className="public-landing__title">{APP_NAME}</h1>
          <p className="public-landing__slogan">{SLOGAN}</p>
        </div>
        <div className="public-landing__button-stack">
          <PrimaryButton
            text={SIGN_UP}
            onClick={(): void => {
              throw new Error("Function not implemented.");
            }}
          />
          <SecondaryButton
            text={LOGIN}
            onClick={(): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </div>
  </main>
);

export default PublicLanding;
