import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Criado apenas para encapsular o botão e deixar mais reutilizável
const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const mergedClasses = twMerge(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-400 px-4 py-2 text-white transition-colors hover:bg-slate-600 touch-manipulation disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  return (
    <button {...rest} className={mergedClasses}>
      {children}
    </button>
  );
};

export default Button;
