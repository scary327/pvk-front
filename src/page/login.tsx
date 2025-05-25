"use client";
import { FormField } from "@/shared/ui/FormField";
import { Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/entities/auth/hooks/useLogin";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  });

  const loginMutation = useLogin({
    onSuccess: () => {
      console.log("Успешный логин!");
      router.push("/");
    },
    onError: (error) => {
      console.error("Ошибка логина:", error);
      setErrors((prev) => ({
        ...prev,
        form: "Неверное имя пользователя или пароль",
      }));
    },
  });
  1;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let usernameError = "";
    let passwordError = "";

    if (!username.trim()) {
      usernameError = "Имя пользователя не может быть пустым";
    }

    if (password.length < 6) {
      passwordError = "Пароль должен быть минимум 6 символов";
    }

    setErrors({ username: usernameError, password: passwordError, form: "" });

    if (!usernameError && !passwordError) {
      loginMutation.mutate({ username, password });
    }
  };

  return (
    <div className="border-2 border-primary rounded-[12px] p-[32px] flex flex-col items-center w-full gap-4">
      <Heading className="text-primary pb-[16px]">Вход</Heading>
      <FormField
        label="Имя пользователя"
        name="username"
        type="text"
        placeholder=""
        value={username}
        onChange={(e) => {
          const val = e.target.value;
          setUsername(val);

          if (!val.trim()) {
            setErrors((prev) => ({
              ...prev,
              username: "Имя пользователя не может быть пустым",
            }));
          } else {
            setErrors((prev) => ({ ...prev, username: "" }));
          }
        }}
        error={errors.username}
        required
      />
      <FormField
        label="Пароль"
        name="password"
        type="password"
        placeholder="Минимальная длинна 6 символов"
        value={password}
        onChange={(e) => {
          const val = e.target.value;
          setPassword(val);
          if (val.length < 6) {
            setErrors((prev) => ({
              ...prev,
              password: "Пароль должен быть минимум 6 символов",
            }));
          } else {
            setErrors((prev) => ({ ...prev, password: "" }));
          }
        }}
        error={errors.password}
        required
      />
      {errors.form && (
        <Text color="red" size="2">
          {errors.form}
        </Text>
      )}
      {loginMutation.isLoading && <Text size="2">Выполняется вход...</Text>}
      <div className="flex items-center w-full justify-between px-4 gap-x-3 mt-[12px]">
        <Link href="/registration">
          <Text size="2" className="font-semibold border-b-animation">
            Регистрация
          </Text>
        </Link>
        <Button
          className="!cursor-pointer"
          size="3"
          type="submit"
          onClick={handleSubmit}
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Вход..." : "Войти"}
        </Button>
      </div>
    </div>
  );
};
