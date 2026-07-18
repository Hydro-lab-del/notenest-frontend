import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  const {
    icon: Icon,
    label,
    to,
    isSidebarHovered,
    logout = false,
    onClick,
    mobile = false,
  } = props;
  const baseStyles = `group flex items-center justify-between p-4 rounded w-full
      transition transform duration-150 ease-in-out`;
  if (logout) {
    return (
      <button onClick={onClick} className={`${baseStyles} hover:bg-red-100 hover:text-red-500 active:scale-95 text-gray-500`}>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 group-hover:text-red-500" />
          {(mobile || isSidebarHovered) && (
            <span className="font-semibold text-gray-800 group-hover:text-red-500">{label}</span>
          )}
        </div>
        <div className={`size-1.5 rounded-full animate-pulse group-hover:bg-red-500 ${(mobile || isSidebarHovered) ? "block" : "invisible"}`} />
      </button>
    );
  }
  return (

    <NavLink
      to={to}
      className={({ isActive }) => `
        ${baseStyles}
        ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"}
      `}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`} />
            {(mobile || isSidebarHovered) && (
              <span className={`font-semibold ${isActive ? "text-blue-600" : "text-gray-800 group-hover:text-blue-600"}`}>
                {label}
              </span>
            )}
          </div>

          {/* Dot shows only if active and sidebar is visible */}
          <div
            className={`size-1.5 rounded-full animate-pulse bg-blue-500
              ${(mobile || isSidebarHovered) && isActive ? "block" : "invisible"}`}
          />
        </>
      )}
    </NavLink>
  );
  
};
export default NavItem; 