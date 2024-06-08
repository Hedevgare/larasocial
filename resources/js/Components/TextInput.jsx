import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', name, id, value, parentClassName, className, placeholder, autoComplete, required, disabled, isFocused, handleChange, handleEnter },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={`flex flex-col items-start ${parentClassName}`}>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-larasocial-secondary focus:ring-larasocial-secondary shadow-sm ` +
                    className
                }
                placeholder={placeholder}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleEnter(e)}
            />
        </div>
    );
});
