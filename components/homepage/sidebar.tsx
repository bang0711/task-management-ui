import { signOut } from "@/lib/auth";
import Image from "next/image";
import React from "react";
import SidebarLinks from "./sidebar-links";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  session: Session;
};

async function Sidebar({ session }: Props) {
  return (
    <aside className="border-2 border-primary py-4 rounded-lg h-full flex flex-col justify-between">
      <div className="flex flex-col gap-2 items-center">
        <Image
          alt={session?.user?.name!}
          src={session?.user?.image!}
          width={100}
          height={100}
          className="size-14 rounded-full"
        />
        <p className="text-primary-foreground">{session?.user?.name}</p>
      </div>
      <SidebarLinks />

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="flex justify-center"
      >
        <Button>Log out</Button>
      </form>
    </aside>
  );
}

export default Sidebar;
