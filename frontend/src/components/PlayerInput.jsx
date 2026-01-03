export default function PlayerInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded"
        placeholder={label}
      />
    </div>
  );
}
