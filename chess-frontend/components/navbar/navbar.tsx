import Link from "next/link";
import { AuthSection } from "./auth-section";
import { Suspense } from "react";
import { Logo } from "./logo";

export default function Navbar() {
  return (
    <nav className="bg-neutral-6 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center justify-end gap-4 flex-2">
            <Suspense fallback={<NavbarSkeleton />}>
              <AuthSection />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavbarSkeleton() {
  return (
    <div className="flex justify-between items-center gap-6">
      <nav className="relative flex gap-1">
        <div className="px-4 py-2">
          <div className="h-4 w-10 bg-muted rounded animate-pulse" />
        </div>
        <div className="px-4 py-2">
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
        </div>
        <div className="px-4 py-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="px-4 py-2">
          <div className="h-4 w-14 bg-muted rounded animate-pulse" />
        </div>
      </nav>
      <div className="flex items-center gap-4 pl-6 border-l border-border ml-10">
        <div className="flex items-center gap-2.5 px-2.5 py-1.5">
          <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          <div className="hidden sm:block">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-3.5 h-3.5 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
