import { SandpackPreview } from "@codesandbox/sandpack-react";
import { useSandpackReset } from "@/hooks/use-sandpack-reset";

const ResetSandpackPreview = ({ activeJsonId, ...props }) => {
  useSandpackReset(activeJsonId);

  return <SandpackPreview {...props} />;
};

export default ResetSandpackPreview;
