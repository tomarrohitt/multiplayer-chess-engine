import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarApp } from "./sidebar-app";
import { CSSProperties } from "react";

export const SidebarLayout = () => {
  return (
    <div className="bg-neutral-5 fixed left-0 top-0 z-10">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "12rem",
          } as CSSProperties
        }
      >
        <SidebarApp />
      </SidebarProvider>
    </div>
  );
};
