import FullScreenLoader from "@/components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useProfile } from "@/data/profile/useProfile.ts";
import { Navigate, Outlet } from "react-router";

type DashboardGateProps = {
  requireDashboard: boolean;
};

const DashboardGate = ({ requireDashboard }: DashboardGateProps) => {
  const { user } = useAuth();
  const { data: profile, isPending, isError } = useProfile(user!.id);

  if (isPending) return <FullScreenLoader />;

  // TODO: Add error screen
  if (isError) return <div>Something went wrong loading your profile.</div>;

  if (requireDashboard && !profile.onboarding_completed)
    return <Navigate to="/onboarding" replace />;

  if (!requireDashboard && profile.onboarding_completed)
    return <Navigate to="/my-family" replace />;

  return <Outlet />;
};

export default DashboardGate;
