"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { login } from "@/actions/auth";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { classes } from "../../_components/classes";
import { cn } from "@/lib/utils";

const initialState = {
  success: false,
  message: "",
  errors: {
    email: "",
    password: "",
  },
  inputs: {
    email: "",
    password: "",
  },
};

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [state, action, pending] = useActionState(
    login.bind(null, redirectTo),
    initialState,
  );

  return (
    <form action={action} className="space-y-5 ">
      {state.message && <div className={classes.message}>{state.message}</div>}

      <Field>
        <FieldLabel className={cn("mb-1", classes.label)} htmlFor="email">
          Email address
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={pending}
          defaultValue={state.inputs.email}
          placeholder="you@example.com"
          className={classes.input}
        />
        <FieldError className={classes.error}>{state.errors.email}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password" className={cn("mb-1", classes.label)}>
          Password
        </FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          disabled={pending}
          defaultValue={state.inputs.password}
          placeholder="•••••••••••••••••"
          className={classes.input}
        />
        <FieldError className={classes.error}>
          {state.errors.password}
        </FieldError>
      </Field>

      <button type="submit" disabled={pending} className={classes.button}>
        {pending ? (
          <>
            <Loader2 className="size-5 animate-spin mr-2" />
            Signing In…
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};
