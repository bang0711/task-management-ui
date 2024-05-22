import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

async function AuthPage({}: Props) {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <form
      className="flex items-center justify-center min-h-screen"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button type="submit" className="flex items-center gap-2">
        <Image
          alt="google"
          src={"/icons/google.svg"}
          width={100}
          height={100}
          className="size-6"
        />{" "}
        Sign in with Google
      </Button>
    </form>
  );
}

export default AuthPage;
