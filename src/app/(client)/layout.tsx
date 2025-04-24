import { Logo } from "@/shared/ui/Logo";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-container center">
      <div className="form-container">
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default Page;
