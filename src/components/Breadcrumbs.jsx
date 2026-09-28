import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(p => p);

  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand/60 mb-6">
      <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" /> 
      </Link>
      
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const formattedPath = path.replace(/-/g, ' ');

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3 h-3 text-sand/40" />
            {isLast ? (
              <span className="text-gold font-medium">{formattedPath}</span>
            ) : (
              <Link to={routeTo} className="hover:text-gold transition-colors">
                {formattedPath}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
