import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logo-icon.svg" alt="logo" width={46} height={46} />
      <Image src="/logo-text.svg" alt="logo" width={115} height={31} />
    </div>
  );
};
