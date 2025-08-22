"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/navigation";
import * as React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brand from "../layout/Brand";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TOAST_DEFAULT_DURATION } from "@/constants/config";
import { useErrorMessage } from "@/i18n/useErrorMessage";
import { codeFromUnknown, extractErrorCode } from "@/lib/api/error";
import { makeSignupSchema, SignupInput } from "@/lib/validation/auth";

export default function SignupForm() {
  const t = useTranslations("signup");
  const tZod = useTranslations("zod");
  const router = useRouter();
  const [, setServerError] = React.useState<string | null>(null);
  const schema = React.useMemo(() => makeSignupSchema(tZod), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", fullName: "", email: "", password: "" },
    mode: "onBlur",
  });

  const errorMsg = useErrorMessage();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const code = await extractErrorCode(res);
        const msg = errorMsg(code);
        setServerError(msg);
        toast.error(msg, { duration: TOAST_DEFAULT_DURATION });
        return;
      }
      router.push("/signin");
    } catch (err) {
      const code = codeFromUnknown(err);
      const msg = errorMsg(code);
      setServerError(msg);
      toast.error(msg, { duration: TOAST_DEFAULT_DURATION });
    }
  });

  return (
    <>
      <div className="mb-6 flex justify-center">
        <Brand centered size="lg" showTagline className="select-none" />
      </div>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-foreground/10 mb-6 w-full gap-2 rounded-xl border bg-white text-black shadow-sm hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-black/20"
      >
        <a
          href="/api/auth/google"
          aria-label={t("withGoogleAria")}
          className="inline-flex items-center gap-2"
        >
          <Icon
            icon="logos:google-icon"
            width={18}
            height={18}
            aria-hidden="true"
            className="shrink-0"
          />
          {t("withGoogle")}
        </a>
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="bg-foreground/10 h-px w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-foreground/60 px-2 text-xs">{t("or")}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 text-left">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            {t("username.label")}
          </label>
          <Input id="name" placeholder={t("username.placeholder")} {...register("name")} />
          {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium">
            {t("fullName.label")}
          </label>
          <Input id="fullName" placeholder={t("fullName.placeholder")} {...register("fullName")} />
          {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            {t("email.label")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={t("email.placeholder")}
            {...register("email")}
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            {t("password.label")}
          </label>
          <Input
            id="password"
            type="password"
            placeholder={t("password.placeholder")}
            {...register("password")}
          />
          {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
        </div>
        <Button type="submit" size="lg" className="mt-2 w-full rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
        <p className="text-foreground/60 mt-1 text-center text-xs">
          {t("hasAccount")}{" "}
          <Link href="/signin" className="hover:text-foreground underline underline-offset-4">
            {t("signin")}
          </Link>
        </p>
      </form>
    </>
  );
}
