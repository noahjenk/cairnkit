export function FloatingSearchBox() {
  return (
    <label className="floating-search">
      <span className="sr-only">Search placeholder</span>
      <input type="search" placeholder="Search placeholder" disabled />
    </label>
  );
}
