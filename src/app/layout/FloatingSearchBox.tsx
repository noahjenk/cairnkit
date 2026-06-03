import { TextInput } from '../../ui';

export function FloatingSearchBox() {
  return (
    <TextInput
      className="floating-search"
      disabled
      label="Search placeholder"
      placeholder="Search placeholder"
      type="search"
    />
  );
}
