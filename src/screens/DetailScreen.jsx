import { useMemo } from 'react';
import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import Button from '../components/Button';
import { SAVE_TIP, SET_CURRENT_SCREEN } from '../contexts/actions';

const DetailScreen = () => {
  const { selectedTip, selectedTipDetail, savedTips } = useWellnessState();
  const { dispatch } = useWellnessDispatch();

  const isSaved = useMemo(() => {
    return savedTips.some((t) => t.id === selectedTip?.id);
  }, [savedTips, selectedTip]);

  if (!selectedTip || !selectedTipDetail) {
    return <p className="text-center text-red-500">Error: No tip selected.</p>;
  }

  const handleSaveTip = () => {
    if (!isSaved) {
      dispatch({ type: SAVE_TIP, payload: selectedTip });
    }
    dispatch({ type: SET_CURRENT_SCREEN, payload: 'SavedTips' });
  };

  const handleBack = () => {
    dispatch({ type: SET_CURRENT_SCREEN, payload: 'TipBoard' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-2xl rounded-xl">
      <Button variant="outline" onClick={handleBack} className="mb-4 sm:mb-6">
        ← Back to Tips
      </Button>

      <div className="border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
        <span className="text-4xl sm:text-5xl mr-2 sm:mr-3">
          {selectedTip.icon || '💡'}
        </span>
        <h1 className="inline-block text-2xl sm:text-4xl font-extrabold text-indigo-700">
          {selectedTip.title}
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-500">
          {selectedTip.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Rationale and Explanation
          </h2>
          <p
            className="text-gray-700 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: selectedTipDetail.explanation,
            }}
          ></p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Step-by-Step Action Plan
          </h2>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-3 pl-2 text-gray-700 text-sm sm:text-base">
            {selectedTipDetail.steps.map((step, index) => (
              <li key={index} className="pl-1" dangerouslySetInnerHTML={{ __html: step }}></li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
        <Button onClick={handleSaveTip} disabled={isSaved} className="w-full sm:w-auto">
          {isSaved ? 'Tip Already Saved' : 'Save This Tip'}
        </Button>
      </div>
    </div>
  );
};

export default DetailScreen;
