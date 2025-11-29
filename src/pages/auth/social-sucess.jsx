import { CheckCircle2 } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { SEOMeta } from "@/components/seo/seo-meta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSocialAuthValidateMutation } from "@/hooks/use-auth";

const SocialSuccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("access_token");

  const { mutate: socialValidate } = useSocialAuthValidateMutation();

  React.useEffect(() => {
    if (token) {
      socialValidate({ access_token: token });
    }
  }, [token, socialValidate]);

  return (
    <>
      <SEOMeta
        description="Authentication success page for Staron AI. Continue to your dashboard after signing in with Google."
        keywords="auth success, login success, Google login, Staron AI"
        path="/auth-success"
        title="Auth Success - Staron AI"
      />

      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-md">
          <Card className="rounded-2xl border border-neutral-800 bg-neutral-900 text-center shadow-xl">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <CheckCircle2 className="h-14 w-14 text-[var(--light-blue)]" />
              </div>
              <CardTitle className="font-bold text-2xl text-white">
                Authentication Successful
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-neutral-400">
                You’ve successfully signed in with{" "}
                <span className="font-semibold text-white">account</span>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default SocialSuccess;
