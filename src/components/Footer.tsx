import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Image
          src="/logo.png"
          alt="Wax Idiotical Films"
          width={80}
          height={45}
          className="h-8 w-auto opacity-40"
        />
        <p className="font-body text-xs text-muted">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
