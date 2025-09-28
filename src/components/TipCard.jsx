import Button from './Button';

const TipCard = ({ tip, onClick, onSave, onRemove, isSaved = false, showActions = true }) => {
  
  const handleAction = (e) => {
    e.stopPropagation(); // Prevent card click when clicking action button
    if (isSaved && onRemove) {
        onRemove(tip.id);
    } else if (onSave) {
        onSave(tip);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 mb-4 cursor-pointer hover:shadow-xl transition duration-300 border-l-4 ${isSaved? 'border-green-500' : 'border-indigo-500'}`}
    >
      <div className="flex items-start">
        <span className="text-4xl mr-4">{tip.icon || '💡'}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{tip.summary}</p>
        </div>
      </div>
      
      {showActions && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleAction}
            variant={isSaved? 'secondary' : 'primary'}
            className="text-sm py-2 px-4"
          >
            {isSaved? 'Unsave' : 'View & Save'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TipCard;