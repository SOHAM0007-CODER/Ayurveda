import React from 'react';
import { Link } from 'react-router-dom';

export default function LeafButton({ 
  children, 
  className = '', 
  variant = 'primary', 
  as: Component = 'button',
  to,
  disabled,
  ...rest 
}) {
  const baseClasses = "px-8 py-3.5 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md transition-all duration-300 font-sans font-medium uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variants = {
    primary: "glass !bg-saffron/95 text-dawn hover:!bg-saffron border-none shadow-organic",
    secondary: "glass !bg-forest/80 text-dawn hover:!bg-forest border-none",
    outline: "glass border-brass/50 text-forest hover:bg-dawn/40"
  };

  const combinedClassName = `${baseClasses} ${variants[variant]} ${className}`;

  if (to || Component === Link) {
    return (
      <Link to={to} className={combinedClassName} {...rest}>
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></span>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <Component className={combinedClassName} disabled={disabled} {...rest}>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  );
}
