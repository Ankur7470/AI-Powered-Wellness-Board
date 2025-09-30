const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle =
    "px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition duration-200 ease-in-out cursor-pointer text-sm sm:text-base";
  let variantStyle = "";

  switch (variant) {
    case 'primary':
      variantStyle = "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400";
      break;
    case 'secondary':
      variantStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100";
      break;
    case 'danger':
      variantStyle = "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400";
      break;
    case 'outline':
      variantStyle = "border border-indigo-500 text-indigo-600 hover:bg-indigo-50 disabled:text-indigo-300";
      break;
    default:
      variantStyle = "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
