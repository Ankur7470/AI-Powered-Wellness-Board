const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-white rounded-xl shadow-lg">
      <div className="w-8 sm:w-10 h-8 sm:h-10 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-medium text-gray-700 text-center">
        Generating personalized tips...
      </p>
    </div>
  );
};

export default LoadingIndicator;
