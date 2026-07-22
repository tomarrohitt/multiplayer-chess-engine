"use client";

import { useActionState } from "react";

import { register } from "@/actions/auth";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { classes } from "../../_components/classes";

const initialState = {
  success: false,
  message: "",
  errors: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
  inputs: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
};

export const RegisterForm = () => {
  const [state, action, pending] = useActionState(register, initialState);

  return (
    <form action={action} className="space-y-3">
      {state.message && <div className={classes.message}>{state.message}</div>}
      <Field className="gap-0">
        <FieldLabel className={cn("mb-0.5", classes.label)} htmlFor="name">
          Full name
        </FieldLabel>
        <Input
          id="name"
          name="name"
          type="text"
          disabled={pending}
          defaultValue={state.inputs.name}
          placeholder="John Doe"
          className={cn(classes.input, state.errors.name ? "mb-0" : "mb-2")}
        />
        <FieldError className={classes.error}>{state.errors.name}</FieldError>
      </Field>

      <Field className="gap-0">
        <FieldLabel className={cn("mb-1", classes.label)} htmlFor="username">
          Username
        </FieldLabel>
        <Input
          id="username"
          name="username"
          disabled={pending}
          defaultValue={state.inputs.username}
          placeholder="johndoe"
          className={cn(classes.input, state.errors.username ? "mb-0" : "mb-2")}
        />
        <FieldError className={classes.error}>
          {state.errors.username}
        </FieldError>
      </Field>

      <Field className="gap-0">
        <FieldLabel className={cn("mb-1", classes.label)} htmlFor="email">
          Email address
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          disabled={pending}
          defaultValue={state.inputs.email}
          placeholder="you@example.com"
          className={cn(classes.input, state.errors.email ? "mb-0" : "mb-2")}
        />
        <FieldError className={classes.error}>{state.errors.email}</FieldError>
      </Field>

      <Field className="gap-0">
        <FieldLabel className={cn("mb-1", classes.label)} htmlFor="password">
          Password
        </FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          disabled={pending}
          defaultValue={state.inputs.password}
          placeholder="••••••••••••••••"
          className={cn(classes.input, state.errors.password ? "mb-0" : "mb-2")}
        />
        <FieldError className={classes.error}>
          {state.errors.password}
        </FieldError>
      </Field>

      <button type="submit" disabled={pending} className={classes.button}>
        {pending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
};
