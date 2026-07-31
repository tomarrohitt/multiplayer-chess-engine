"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Swords, Trophy, Users, Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const links: NavLink[] = [
  { name: "Play", href: "/", icon: Swords },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Community", href: "/community", icon: Users },
  { name: "Inbox", href: "/inbox", icon: Inbox },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="space-y-4">
      {links.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <SidebarMenuItem key={name}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="h-auto w-40"
            >
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-full flex items-center gap-4 rounded-lg px-3 py-2 text-base font-semibold transition-colors",

                  isActive ? "bg-green-5/15 text-green-5" : "text-neutral-1",
                )}
              >
                <Icon className="size-5 shrink-0 transition-colors" />
                {name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
