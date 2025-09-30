import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import TipCard from '../components/TipCard';
import Button from '../components/Button';
import { REMOVE_TIP } from '../contexts/actions';

const SavedTipsScreen = () => {
  const { savedTips } = useWellnessState();
  const { dispatch, fetchTipDetail } = useWellnessDispatch();

  const handleRemoveTip = (tipId) => {
    dispatch({ type: REMOVE_TIP, payload: tipId });
  };

  const handleViewDetail = (tip) => {
    fetchTipDetail(tip);
  };

  const handleBack = () => {
    dispatch({ type: 'SET_CURRENT_SCREEN', payload: 'TipBoard' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Button variant="outline" onClick={handleBack} className="mb-4 sm:mb-6">
        ← Back to Live Board
      </Button>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6">
        Your Saved Wellness Tips ({savedTips.length})
      </h1>

      {savedTips.length === 0 ? (
        <div className="text-center p-6 sm:p-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-base sm:text-xl text-gray-500">
            You haven't saved any favorite tips yet.
          </p>
          <Button variant="primary" onClick={handleBack} className="mt-4">
            Explore Tips
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedTips.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              isSaved={true}
              onRemove={handleRemoveTip}
              onClick={() => handleViewDetail(tip)}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTipsScreen;
