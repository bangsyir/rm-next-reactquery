export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container mx-auto py-4 mt-auto">
      <p className="flex flex-wrap items-center">
        © {year}. All rights reserved. Build with ❤️ by&nbsp;
        <a
          href="https://bangsyir.vercel.app"
          className="text-green-500 font-bold"
          target="_blank"
          rel="noreferrer"
        >
          Bangsyir
        </a>
      </p>
    </footer>
  );
}
