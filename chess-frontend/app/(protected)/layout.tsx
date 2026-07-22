import { getUserFromSession } from "@/actions/session";
import { SocketProvider } from "@/store/socket-provider";
import { redirect } from "next/navigation";
// import { ConnectionStatus } from "./game/[id]/_components/connection-status";
import { SearchingModal } from "@/components/game/searching-modal";
import { GlobalRematchToast } from "./game/[id]/_components/global-rematch-toast";
import { ActiveGameBanner } from "@/components/game/active-game-banner";
import { GlobalChallengeToast } from "@/components/global-challenge-toast";
import { Toaster } from "sonner";
import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
// import Navbar from "@/components/navbar/navbar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserFromSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <SocketProvider user={user}>
      {/* <ConnectionStatus /> */}
      <SearchingModal />
      <GlobalRematchToast />
      <GlobalChallengeToast />
      <ActiveGameBanner />
      <Toaster theme="dark" position="bottom-right" />
      <div className="grid h-screen grid-cols-[12rem_1fr]">
        <aside className="border-r border-zinc-800 bg-zinc-950">
          <SidebarLayout />
        </aside>
        <main className="flex flex-col">{children}</main>
      </div>
    </SocketProvider>
  );
};

export default ProtectedLayout;
