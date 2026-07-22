import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mt-10  rounded-xs p-6 relative overflow-hidden text-neutral-0 ">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1 text-neutral-1">Welcome Back</h1>
        <p className="text-neutral-2">Sign in to your account to continue</p>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <LoginForm />
      </Suspense>
      <div className="relative my-5">
        <div className="relative flex justify-center text-sm">
          <span className="text-neutral-2">Don&apos;t have an account?</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/register"
          className="font-semibold transition-colors duration-200 hover:text-neutral-1/90 hover:underline text-neutral-1 uppercase"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
