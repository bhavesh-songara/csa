import { toast } from "@/hooks/use-toast";

export const onMutationError = (error: any) => {
  console.log(error);

  toast({
    title: "Oops, Something's Not Right! 🌟",
    description:
      error?.response?.data?.message ||
      "We're experiencing a temporary hiccup. Please try again shortly! ✨",
  });
};
