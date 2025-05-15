import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="text-lg font-semibold">
      <div className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <span>Msgscan</span>
      </div>
    </Link>
  );
}
