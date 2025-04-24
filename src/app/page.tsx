"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  //тут проверка на авторизацию
  router.push("/login");
  return <main></main>;
}
