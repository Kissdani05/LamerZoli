export default function Footer() {
  return (
    <footer className="footer w-full py-6 px-4 bg-black text-white flex flex-col items-center gap-2 text-sm">
      <div className="flex flex-col items-center gap-1">
        <span>
          📞{' '}
          <a href="tel:+36309760305" className="underline">
            +36 30 976 0305
          </a>
        </span>
        <span>
          ✉️{' '}
          <a href="mailto:lamerzle88@gmail.com" className="underline">
            lamerzle88@gmail.com
          </a>
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        © {new Date().getFullYear()} Lámer Zoltán Gokart
      </div>
    </footer>
  );
}
