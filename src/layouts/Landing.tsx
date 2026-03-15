import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton.tsx";
import family from "@assets/images/family.svg";
import logo from "@assets/images/logo.svg";
import { APP_NAME, SLOGAN } from "@copy/general.ts";
import { LOGIN_BUTTON } from "@copy/login.ts";
import { SIGN_UP_BUTTON } from "@copy/signUp.ts";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="flex h-full justify-center">
      <div className="hidden lg:flex lg:flex-3 lg:items-center lg:justify-end lg:pr-[20vw]">
        <img src={family} alt="family" className="lg:h-1/2" />
      </div>
      <div className="flex items-center lg:flex-2">
        <div className="flex flex-col items-center gap-5">
          <img src={logo} alt="logo" className="h-40" />
          <div className="flex flex-col items-center">
            <p className="text-primary-text text-3xl font-medium">{APP_NAME}</p>
            <p className="text-tertiary-text text-base italic">{SLOGAN}</p>
          </div>
          <div className="flex flex-col gap-3">
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
