export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-larasocial-secondary shadow-sm focus:ring-larasocial-secondary"
            onChange={(e) => handleChange(e)}
        />
    );
}
