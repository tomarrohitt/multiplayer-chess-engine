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

const links = [
  { name: "Play", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Community", href: "/community" },
  { name: "Inbox", href: "/inbox" },
];

export function SidebarApp() {
  return (
    <Sidebar collapsible="none" className="h-svh flex flex-col justify-around">
      <SidebarHeader>
        <SidebarMenu>
          <Link href="/" className="w-26 flex-center">
            Gambit
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-y-4">
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton>
                    <Link
                      href={link.href}
                      className="text-neutral-0 font-semibold text-lg"
                    >
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="">
        <UserDropdown
          user={{
            name: "Rohit Tomar",
            email: "tomarrohit5034@gmail.com",
            emailVerified: false,
            image:
              "https://res.cloudinary.com/dxggynbng/image/upload/v1782561955/avatars/019da9d5-ca6a-7621-8407-d394ad4874e8-1782561949441.webp",
            createdAt: new Date("2026-04-20T07:40:53.737Z"),
            username: "tomarrohitttt",
            wins: 28,
            losses: 31,
            draws: 6,
            rating: 1015,
            id: "019da9d5-ca6a-7621-8407-d394ad4874e8",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
