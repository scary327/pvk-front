import { LoginPage } from "@/page/login";

const Page = () => {
  return <LoginPage />;
};

export default Page;

export const metadata = {
  title: "Вход",
};

export const revalidate = 0;

export const dynamic = "force-dynamic";
