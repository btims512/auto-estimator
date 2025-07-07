import LanguageToggle from "./LanguageToggle";
import StartOverButton from "./StartOverButton";

export default function Header() {
  return (
    <header className="header-container">
      <LanguageToggle />
      <StartOverButton />
    </header>
  );
}
