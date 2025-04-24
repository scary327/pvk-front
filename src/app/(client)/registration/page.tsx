import { RegistrationPage } from "@/page/registration";

export const Page = () => {
  return <RegistrationPage />;
};

export default Page;

export const metadata = {
  title: "Регистрация",
};

export const revalidate = 0;

export const dynamic = "force-dynamic";
