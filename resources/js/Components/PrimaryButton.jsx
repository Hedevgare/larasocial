export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-larasocial-secondary border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-larasocial-secondary focus:bg-larasocial-secondary active:bg-larasocial-secondary focus:outline-none focus:ring-2 focus:ring-larasocial-secondary focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
