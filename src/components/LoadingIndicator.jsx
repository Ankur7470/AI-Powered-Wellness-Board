const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">Generating personalized tips...</p>
    </div>
  );
};

export default LoadingIndicator;