import FullScreenLoader from "@/components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { useAuth } from "@/features/auth/context/useAuth.ts";
import { PROFILE_FETCH_ERROR } from "@/features/navigation/copy/errors.ts";
import { useProfile } from "@/features/navigation/data/profile/useProfile.ts";
import { Navigate, Outlet } from "react-router";

type DashboardGateProps = {
  requireDashboard: boolean;
};

const DashboardGate = ({ requireDashboard }: DashboardGateProps) => {
  const { user } = useAuth();
  const { data: profile, isPending, isError } = useProfile(user!.id);

  if (isPending) return <FullScreenLoader />;

  if (isError) return <Navigate to="/error-page" replace state={{ message: PROFILE_FETCH_ERROR }} />;

  if (requireDashboard && !profile.onboarding_completed) return <Navigate to="/onboarding" replace />;

  if (!requireDashboard && profile.onboarding_completed) return <Navigate to="/my-family" replace />;

  return <Outlet />;
};

export default DashboardGate;
