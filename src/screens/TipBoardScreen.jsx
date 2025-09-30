import React, { useMemo } from 'react';
import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import TipCard from '../components/TipCard';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { SET_CURRENT_SCREEN } from '../contexts/actions';

const TipBoardScreen = () => {
  const { profile, currentTips = [], savedTips = [], isLoading, error } = useWellnessState();
  const { dispatch, fetchTipDetail, fetchTips } = useWellnessDispatch();

  const savedTipIds = useMemo(() => new Set((savedTips || []).map((t) => t.id)), [savedTips]);

  const handleCardClick = (tip) => {
    fetchTipDetail(tip);
  };

  const handleRegenerate = () => {
    if (!profile) {
      // Send user back to profile screen to fill details
      dispatch({ type: SET_CURRENT_SCREEN, payload: 'Profile' });
      return;
    }
    fetchTips(profile);
  };

  const handleGoToSaved = () => {
    dispatch({ type: SET_CURRENT_SCREEN, payload: 'SavedTips' });
  };

  // If no profile has been set yet
  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 mb-2">
            No profile found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            To get personalized recommendations, please fill out your profile first.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button onClick={() => dispatch({ type: SET_CURRENT_SCREEN, payload: 'Profile' })}>
              Set Up Profile
            </Button>
            <Button variant="outline" onClick={handleGoToSaved}>
              View Saved ({savedTips.length})
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Tip: After you set your profile and click "Generate My Tips", AI-generated recommendations will appear here.
        </div>
      </div>
    );
  }

  // Normal flow when profile exists
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          Recommendations for {profile?.gender || '—'} ({profile?.age ?? '—'})
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleGoToSaved}>
            View Saved ({savedTips.length})
          </Button>
          <Button variant="secondary" onClick={handleRegenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Regenerate Tips'}
          </Button>
        </div>
      </div>

      <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
        Tap any of the 5 personalized tips below for a detailed explanation and step-by-step guidance.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-56">
          <LoadingIndicator />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <ErrorMessage message={error} onRetry={() => fetchTips(profile)} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[28rem] overflow-y-auto pr-2">
            {Array.isArray(currentTips) && currentTips.length > 0 ? (
              currentTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  onClick={() => handleCardClick(tip)}
                  isSaved={savedTipIds.has(tip.id)}
                  showActions={false}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 p-6 bg-white rounded-xl shadow-sm">
                No tips available yet. Click <span className="font-semibold">Regenerate Tips</span> to get recommendations.
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button onClick={handleRegenerate} disabled={isLoading}>
              Get 5 Fresh Recommendations
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TipBoardScreen;
