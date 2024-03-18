import { LoaderCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

export function AuthFormButton({
  isSubmitting,
  text = "Continue",
}: {
  isSubmitting: boolean;
  text?: string;
}) {
  return (
    <Button disabled={isSubmitting} className="w-full" size={"lg"}>
      {isSubmitting ? (
        <LoaderCircleIcon className="animate-spin text-2xl" />
      ) : (
        text
      )}
    </Button>
  );
}
