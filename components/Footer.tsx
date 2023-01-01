export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-right">
      <hr className="border-t border-zinc-600 my-2" />
      <p className="flex flex-wrap items-center">
        © {year}. All rights reserved. Build with ❤️ by&nbsp;
        <a
          href="https://github.com/bangsyir"
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
