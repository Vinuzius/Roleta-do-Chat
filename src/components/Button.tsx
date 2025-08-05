import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Criado apenas para encapsular o botão e deixar mais reutilizável
const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const mergedClasses = twMerge(
    "bg-slate-400 p-2 rounded-md text-white hover:bg-slate-600",
    className
  );

  return (
    <button {...rest} className={mergedClasses}>
      {children}
    </button>
  );
};

export default Button;
