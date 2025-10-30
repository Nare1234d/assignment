export default function ToggleTheme({ theme, setTheme }) {
  return (
    <button
      className="px-4 py-2 rounded-md border"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
