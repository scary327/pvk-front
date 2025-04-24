"use client";
import { FormField } from "@/shared/ui/FormField";
import { Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

export const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    lastName: "",
    firstName: "",
    middleName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    lastName: "",
    firstName: "",
    middleName: "",
    password: "",
    confirmPassword: "",
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      lastName: "",
      firstName: "",
      middleName: "",
      password: "",
      confirmPassword: "",
    };

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Введите фамилию";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Введите имя";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть минимум 6 символов";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      console.log("Отправка формы:", formData);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "email" && !emailPattern.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Некорректный email" }));
    } else if (field === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (field === "password" && value.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Пароль должен быть минимум 6 символов" }));
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (field === "confirmPassword" && value !== formData.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Пароли не совпадают" }));
    } else if (field === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  return (
    <div className="border-2 border-primary rounded-[12px] p-[32px] flex flex-col items-center w-full gap-4">
      <Heading className="text-primary pb-[16px]">Регистрация</Heading>
      <FormField
        label="Почта"
        name="email"
        type="email"
        placeholder=""
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
      />
      <FormField
        label="Фамилия"
        name="lastName"
        type="text"
        placeholder=""
        value={formData.lastName}
        onChange={handleChange("lastName")}
        error={errors.lastName}
        required
      />
      <FormField
        label="Имя"
        name="firstName"
        type="text"
        placeholder=""
        value={formData.firstName}
        onChange={handleChange("firstName")}
        error={errors.firstName}
        required
      />
      <FormField
        label="Отчество"
        name="middleName"
        type="text"
        placeholder=""
        value={formData.middleName}
        onChange={handleChange("middleName")}
        error={errors.middleName}
      />
      <FormField
        label="Пароль"
        name="password"
        type="password"
        placeholder="Минимальная длинна 6 символов"
        value={formData.password}
        onChange={handleChange("password")}
        error={errors.password}
        required
      />
      <FormField
        label="Подтверждение пароля"
        name="confirmPassword"
        type="password"
        placeholder=""
        value={formData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        required
      />
      <div className="flex items-center w-full justify-between px-4 gap-x-3 mt-[12px]">
        <Link href="/login">
          <Text size="2" className="font-semibold border-b-animation">
            Вход
          </Text>
        </Link>
        <Button
          className="!cursor-pointer"
          size="3"
          type="button"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};
