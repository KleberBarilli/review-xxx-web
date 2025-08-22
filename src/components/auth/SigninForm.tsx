"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/navigation";
import { Icon } from "@iconify/react";
import Brand from "../layout/Brand";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { extractErrorCode, codeFromUnknown } from "@/lib/api/error";
import { useErrorMessage } from "@/i18n/useErrorMessage";
import { TOAST_DEFAULT_DURATION } from "@/constants/config";
import { makeSignInSchema, SignInInput } from "@/lib/validation/auth";

export default function SigninForm() {
  const t = useTranslations("signin");
  const tZod = useTranslations("zod");
  const router = useRouter();
  const [, setServerError] = React.useState<string | null>(null);
  const errorMsg = useErrorMessage();
  const schema = React.useMemo(() => makeSignInSchema(tZod), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(schema),
    defaultValues: { identifier: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    try {
      const res = await fetch("/api/signin", {
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
      router.push("/");
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
          <Icon icon="logos:google-icon" width={18} height={18} aria-hidden className="shrink-0" />
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
          <label htmlFor="identifier" className="text-sm font-medium">
            {t("identifier.label")}
          </label>
          <Input
            id="identifier"
            autoComplete="username"
            placeholder={t("identifier.placeholder")}
            {...register("identifier")}
            aria-invalid={!!errors.identifier}
          />
          {errors.identifier && (
            <p className="text-destructive text-xs">{errors.identifier.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            {t("password.label")}
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("password.placeholder")}
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
        </div>
        <Button type="submit" size="lg" className="mt-2 w-full rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>

        <p className="text-foreground/60 mt-1 text-center text-xs">
          {t("noAccount")}{" "}
          <Link href="/signup" className="hover:text-foreground underline underline-offset-4">
            {t("signup")}
          </Link>
        </p>
      </form>
    </>
  );
}
