import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import { LogoIcons } from "@/components/shared/logos";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Card Data
const AUTH_CARD = [
  {
    id: 1,
    title: "Sign In as a User",
    description:
      "A complete platform for product builders to create digital experiences",
    buttonText: "Continue as a User",
    role: "user",
  },
  {
    id: 2,
    title: "Sign In as a Developer",
    description:
      "A complete platform for product builders to create digital experiences ",
    buttonText: "Continue as a Developer",
    role: "developer",
  },
];

const SelectRolePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LogoIcons.aiLogo className="h-20 w-20" />
      <p className="text-center text-[var(--text)] text-lg">
        Get Started with Staron AI{" "}
      </p>
      <p className="text-center text-[var(--text)] text-sm">
        Design visually, generate code with AI, or offer your skills as a <br />{" "}
        developer.
      </p>

      <div className="mt-10 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {AUTH_CARD.map((card) => (
            <Card
              className="!p-4 !py-10 !justify-between w-full gap-8 border border-[var(--glassic)] bg-[var(--glassic)]"
              key={card.id}
            >
              <div className="text-center">
                <CardHeader className="!p-0">
                  <CardTitle className="font-bold text-[var(--text)] text-lg">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--text)] text-xs">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </div>
              <CardFooter className="!p-0 flex w-full flex-col items-center">
                <PrimaryButton
                  className="font-medium text-sm shadow-[0_0_20px_rgba(37,1,147,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,1,147,0.8)] 2xl:text-base"
                  onClick={() => navigate(`/auth/register?role=${card.role}`)}
                  title={card.buttonText}
                  type="submit"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRolePage;
