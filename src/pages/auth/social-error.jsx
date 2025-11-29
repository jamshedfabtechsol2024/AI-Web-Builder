import { UserPlus, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEOMeta } from "@/components/seo/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SocialError = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOMeta
        description="Authentication error page for Staron AI. Sign up to continue if you don’t already have an account."
        keywords="auth error, login failed, social login, Staron AI"
        path="/auth-error"
        title="Auth Error - Staron AI"
      />

      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-md">
          <Card className="rounded-2xl border border-neutral-800 bg-neutral-900 text-center shadow-xl">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <XCircle className="h-14 w-14 text-red-500" />
              </div>
              <CardTitle className="font-bold text-2xl text-white">
                Authentication Failed
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-neutral-400">
                We couldn’t sign you in. It looks like you don’t have an account
                yet.
              </p>

              <Button
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[var(--light-blue)]"
                onClick={() => navigate("/auth/select-role")}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default SocialError;
