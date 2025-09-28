import { useMemo } from 'react';
import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import Button from '../components/Button';
import { SAVE_TIP, SET_CURRENT_SCREEN } from '../contexts/actions';

const DetailScreen = () => {
  const { selectedTip, selectedTipDetail, savedTips } = useWellnessState();
  const { dispatch } = useWellnessDispatch();

  // Check if the current tip is already saved
  const isSaved = useMemo(() => {
    return savedTips.some(t => t.id === selectedTip?.id);
  },);

  if (!selectedTip ||!selectedTipDetail) {
    // Should not happen if flow is followed correctly, but for safety:
    return <p className="text-center text-red-500">Error: No tip selected.</p>;
  }

  const handleSaveTip = () => {
    if (!isSaved) {
        dispatch({ type: SAVE_TIP, payload: selectedTip });
    }
    // Optionally navigate to saved tips after save
    dispatch({ type: SET_CURRENT_SCREEN, payload: 'SavedTips' });
  };

  const handleBack = () => {
    dispatch({ type: SET_CURRENT_SCREEN, payload: 'TipBoard' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-xl">
      <Button variant="outline" onClick={handleBack} className="mb-6">
        ← Back to Tips
      </Button>
      
      <div className="border-b pb-4 mb-6">
        <span className="text-5xl mr-3">{selectedTip.icon || '💡'}</span>
        <h1 className="inline-block text-4xl font-extrabold text-indigo-700">{selectedTip.title}</h1>
        <p className="mt-2 text-lg text-gray-500">{selectedTip.summary}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Long Explanation */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Rationale and Explanation</h2>
          <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: selectedTipDetail.explanation}}></p>
        </div>

        {/* Step-by-Step Advice */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Step-by-Step Action Plan</h2>
          <ol className="list-decimal list-inside space-y-3 pl-2 text-gray-700">
            {selectedTipDetail.steps.map((step, index) => (
              <li key={index} className="pl-1" dangerouslySetInnerHTML={{__html: step}}></li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t flex justify-end">
        <Button onClick={handleSaveTip} disabled={isSaved} className="w-full md:w-auto">
          {isSaved? 'Tip Already Saved' : 'Save This Tip'}
        </Button>
      </div>
    </div>
  );
};

export default DetailScreen;