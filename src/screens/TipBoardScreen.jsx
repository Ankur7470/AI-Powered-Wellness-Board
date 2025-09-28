import { useMemo } from 'react';
import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import TipCard from '../components/TipCard';
import Button from '../components/Button';
import { SET_CURRENT_SCREEN } from '../contexts/actions';

const TipBoardScreen = () => {
  const { profile, currentTips, savedTips } = useWellnessState();
  const { dispatch, fetchTipDetail, fetchTips } = useWellnessDispatch();
  
  // Use a set for efficient lookup of saved tips
  const savedTipIds = useMemo(() => new Set(savedTips.map(t => t.id)),);

  const handleCardClick = (tip) => {
    // Navigate and fetch details (async action)
    fetchTipDetail(tip);
  };
  
  const handleRegenerate = () => {
      // Re-run the initial fetch with the stored profile data
      fetchTips(profile);
  };

  const handleGoToSaved = () => {
      dispatch({ type: SET_CURRENT_SCREEN, payload: 'SavedTips' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
            Recommendations for {profile?.gender || ''} ({profile?.age || ''})
        </h1>
        <div className="space-x-4">
            <Button variant="outline" onClick={handleGoToSaved}>
                View Saved ({savedTips.length})
            </Button>
            <Button variant="secondary" onClick={handleRegenerate}>
                Regenerate Tips
            </Button>
        </div>
      </div>

      <p className="text-lg text-gray-600 mb-6">
          Tap any of the 5 personalized tips below for a detailed explanation and step-by-step guidance.
      </p>

      <div className="grid md:grid-cols-2 gap-4 h-88 overflow-y-auto pr-2"> {/* Scrollable container [7] */}
        {currentTips.map(tip => (
          <TipCard
            key={tip.id}
            tip={tip}
            onClick={() => handleCardClick(tip)}
            onSave={() => handleCardClick(tip)} // Click action implicitly leads to save option
            isSaved={savedTipIds.has(tip.id)}
            showActions={false} // Actions are handled by clicking into the detail screen
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
          <Button onClick={handleRegenerate}>
              Get 5 Fresh Recommendations
          </Button>
      </div>
    </div>
  );
};

export default TipBoardScreen;