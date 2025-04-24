"use client";
import { FormField } from "@/shared/ui/FormField";
import { Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    if (!emailPattern.test(email)) {
      emailError = "Некорректный email";
    }

    if (password.length < 6) {
      passwordError = "Пароль должен быть минимум 6 символов";
    }

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      console.log("Отправка формы:", { email, password });
    }
  };

  return (
    <div className="border-2 border-primary rounded-[12px] p-[32px] flex flex-col items-center w-full gap-4">
      <Heading className="text-primary pb-[16px]">Вход</Heading>
      <FormField
        label="Почта"
        name="email"
        type="email"
        placeholder=""
        pattern={emailPattern.source}
        value={email}
        onChange={(e) => {
          const val = e.target.value;
          setEmail(val);

          if (!emailPattern.test(val)) {
            setErrors((prev) => ({ ...prev, email: "Некорректный email" }));
          } else {
            setErrors((prev) => ({ ...prev, email: "" }));
          }
        }}
        error={errors.email}
        required
      />
      <FormField
        label="Пароль"
        name="password"
        type="password"
        placeholder="Минимальная длинна 6 символов"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (e.target.value.length < 6) {
            setErrors({ ...errors, password: "Некорректный пароль" });
          } else {
            setErrors({ ...errors, password: "" });
          }
        }}
        error={errors.password}
        required
      />
      <div className="flex items-center w-full justify-between px-4 gap-x-3 mt-[12px]">
        <Link href="/registration">
          <Text size="2" className="font-semibold border-b-animation">
            Регистрация
          </Text>
        </Link>
        <Button
          className="!cursor-pointer"
          size="3"
          type="button"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};
