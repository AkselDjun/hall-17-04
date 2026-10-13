import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__kicker">Ошибка 404</p>
      <h1 className="not-found__title">Этот кадр вырезан при монтаже</h1>
      <Link href="/" className="not-found__link">
        Вернуться к фильму →
      </Link>
    </main>
  );
}
