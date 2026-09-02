import FullScreenLoader from "@/components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useProfile } from "@/data/profile/useProfile.ts";
import { Navigate, Outlet } from "react-router";

type AuthGateProps = {
  requireAuth: boolean;
};

const AuthGate = ({ requireAuth }: AuthGateProps) => {
  const { user, loading } = useAuth();
  const { data: profile, isPending, isError } = useProfile(user?.id);

  if (loading) return <FullScreenLoader />;

  if (requireAuth && !user) return <Navigate to="/" replace />;

  if (!requireAuth && user) {
    if (isPending) return <FullScreenLoader />;

    // TODO: Add error screen
    if (isError) return <div>Something went wrong loading your profile.</div>;

    return profile.onboarding_completed ? (
      <Navigate to="/my-family" replace />
    ) : (
      <Navigate to="/onboarding" replace />
    );
  }

  return <Outlet />;
};

export default AuthGate;
