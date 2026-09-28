import React from 'react';

export default function LeafButton({ children, onClick, className = '', variant = 'primary' }) {
  const baseClasses = "px-8 py-3.5 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md transition-all font-sans font-medium uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-terracotta text-white hover:bg-terracotta/90",
    secondary: "bg-botanical text-sand hover:bg-botanical-light",
    outline: "border border-botanical text-botanical hover:bg-botanical/5"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
