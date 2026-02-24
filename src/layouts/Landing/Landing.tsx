import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton/SecondaryButton.tsx";
import family from "@assets/images/family.svg";
import logo from "@assets/images/logo.svg";
import { APP_NAME, SLOGAN } from "@copy/general.ts";
import "./Landing.scss";
import { LOGIN_BUTTON } from "@copy/login.ts";
import { SIGN_UP_BUTTON } from "@copy/signUp.ts";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <div className="landing__hero">
        <img src={family} alt="family" className="landing__hero__img" />
      </div>
      <div className="landing__actions">
        <div className="landing__actions__content">
          <img src={logo} alt="logo" className="landing__logo" />
          <div className="landing__text">
            <h1 className="landing__title">{APP_NAME}</h1>
            <p className="landing__slogan">{SLOGAN}</p>
          </div>
          <div className="landing__button-stack">
            <PrimaryButton
              text={SIGN_UP_BUTTON}
              onClick={(): void => {
                navigate("/sign-up");
              }}
            />
            <SecondaryButton
              text={LOGIN_BUTTON}
              onClick={(): void => {
                navigate("/login");
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
