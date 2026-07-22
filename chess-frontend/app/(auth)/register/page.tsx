import Link from "next/link";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <div className="rounded-xs px-6 relative overflow-hidden text-neutral-0">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1 text-neutral-1">Create Account</h1>
        <p className="text-neutral-2"> Join and start playing today</p>
      </div>

      <RegisterForm />

      <div className="relative my-5">
        <div className="relative flex justify-center text-sm">
          <span className="text-neutral-2">Already have an account?</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/login"
          className="font-semibold transition-colors duration-200 hover:text-neutral-1/90 hover:underline text-neutral-1 uppercase"
        >
          Sign In instead
        </Link>
      </div>
    </div>
  );
}
