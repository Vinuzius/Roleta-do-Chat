interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Criado apenas para encapsular o botão e deixar mais reutilizável
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className=" bg-slate-400 p-2 rounded-md text-white">
      {children}
    </button>
  );
};

export default Button;
