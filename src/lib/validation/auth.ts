import { z } from "zod";

type T = (key: string, values?: Record<string, any>) => string;

export const makeSignInSchema = (t: T) =>
  z.object({
    identifier: z
      .string()
      .min(1, t("auth.identifier.required"))
      .nonempty(t("auth.identifier.required")),
    password: z
      .string()
      .min(6, t("auth.password.min", { count: 6 }))
      .nonempty(t("auth.password.required")),
  });

export const makeSignupSchema = (t: T) =>
  z.object({
    name: z
      .string()
      .min(3, t("auth.username.min", { count: 3 }))
      .max(32, t("auth.username.max", { count: 32 }))
      .nonempty(t("auth.username.required"))
      .regex(/^[A-Za-z0-9]+$/, t("auth.username.alnum")),
    fullName: z.string().min(3, t("auth.fullName.min", { count: 3 })),
    email: z.email(t("auth.email.invalid")).nonempty("auth.email.required"),
    password: z
      .string()
      .min(8, t("auth.password.min", { count: 8 }))
      .nonempty(t("auth.password.required")),
  });

export type SignInInput = z.infer<ReturnType<typeof makeSignInSchema>>;
export type SignupInput = z.infer<ReturnType<typeof makeSignupSchema>>;
