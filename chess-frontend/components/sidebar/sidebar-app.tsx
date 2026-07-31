import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserDropdown } from "../navbar/user-dropdown";
import { getUserFromSession } from "@/actions/session";
import { Mail, Swords, Trophy, Users } from "lucide-react";

const links = [
  { name: "Play", href: "/", icon: Swords },
  { name: "Inbox", href: "/inbox", icon: Mail },
  { name: "Community", href: "/community", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export async function SidebarApp() {
  const user = await getUserFromSession();
  if (!user) return;

  return (
    <Sidebar collapsible="none" className="h-svh flex-center py-4">
      <SidebarHeader className="flex-center">
        {/* FIX 1: Removed the invalid <SidebarMenu> wrapper */}
        <Link
          className="tracking-[10px] uppercase font-bold text-green-5 hover:text-green-5/80 text-2xl"
          href="/"
        >
          Gambit
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col w-full justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {links.map(({ icon: Icon, name, href }) => (
                <SidebarMenuItem
                  key={name}
                  className="py-2 hover:bg-neutral-4/10"
                >
                  {/* FIX 2: Added `asChild` to prevent <a> from nesting inside <button> */}
                  <SidebarMenuButton asChild>
                    <Link
                      href={href}
                      className="text-neutral-0 text-lg hover:text-neutral-1 w-full rounded-sm transition-all flex items-center gap-x-2 ml-2"
                    >
                      <Icon /> {name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="flex-1 justify-end">
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
