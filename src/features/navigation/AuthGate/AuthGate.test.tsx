import type { AuthContextType } from "@/context/auth/authContext.type.ts";
import * as useAuthModule from "@/context/auth/useAuth";
import AuthGate from "@/features/navigation/AuthGate/AuthGate.tsx";
import type { User } from "@supabase/supabase-js";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

const mockUseAuth = (overrides: Partial<AuthContextType>) => {
  vi.spyOn(useAuthModule, "useAuth").mockReturnValue({
    user: null,
    session: null,
    loading: false,
    signUp: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    resendEmail: vi.fn(),
    resetPassword: vi.fn(),
    updatePassword: vi.fn(),
    ...overrides,
  });
};

const renderAuthGate = (requireAuth: boolean, initialPath = "/protected") => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<AuthGate requireAuth={requireAuth} />}>
          <Route path="/protected" element={<div>Protected</div>} />
        </Route>
        <Route path="/" element={<div>Landing</div>} />
        <Route path="/my-family" element={<div>My Family</div>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("AuthGate", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loader while loading", () => {
    mockUseAuth({ loading: true });
    renderAuthGate(true);
    expect(screen.getByTestId("full-screen-loader")).toBeInTheDocument();
  });

  it("redirects unauthenticated user to / when requireAuth is true", () => {
    mockUseAuth({ user: null });
    renderAuthGate(true);
    expect(screen.getByText("Landing")).toBeInTheDocument();
  });

  it("redirects authenticated user to /my-family when requireAuth is false", () => {
    mockUseAuth({ user: { id: "1" } as User });
    renderAuthGate(false);
    expect(screen.getByText("My Family")).toBeInTheDocument();
  });

  it("renders outlet when unauthenticated and requireAuth is false", () => {
    mockUseAuth({ user: null });
    renderAuthGate(false);
    expect(screen.getByText("Protected")).toBeInTheDocument();
  });

  it("renders outlet when authenticated and requireAuth is true", () => {
    mockUseAuth({ user: { id: "1" } as User });
    renderAuthGate(true);
    expect(screen.getByText("Protected")).toBeInTheDocument();
  });
});
