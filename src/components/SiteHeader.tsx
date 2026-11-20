import LocalClock from "./LocalClock";

const SiteHeader = () => (
  <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-end px-6 pt-6">
    <LocalClock />
  </header>
);

export default SiteHeader;
