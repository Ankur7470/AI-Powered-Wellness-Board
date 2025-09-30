import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-red-50 border border-red-300 rounded-xl shadow-lg max-w-md mx-auto text-center">
      <svg
        className="w-10 sm:w-12 h-10 sm:h-12 text-red-500 mb-3 sm:mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-1 sm:mb-2">
        Operation Failed
      </h3>
      <p className="text-sm sm:text-base text-red-700 mb-4 sm:mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="danger">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
