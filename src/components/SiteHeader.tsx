import LocalClock from "./LocalClock";
import Logo from "./Logo";

const SiteHeader = () => (
  <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 pt-6">
    <Logo />
    <LocalClock />
  </header>
);

export default SiteHeader;
