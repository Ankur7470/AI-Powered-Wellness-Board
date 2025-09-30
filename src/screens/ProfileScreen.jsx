import { useState } from 'react';
import { useWellnessState, useWellnessDispatch } from '../contexts/WellnessContext';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import { SET_PROFILE, FETCH_TIPS_LOADING } from '../contexts/actions';

const ProfileScreen = () => {
  const { isLoading } = useWellnessState();
  const { dispatch, fetchTips } = useWellnessDispatch();

  const [formData, setFormData] = useState({
    age: '',
    gender: 'N/A',
    goal: 'Stress Reduction',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      setValidationError('Please enter a valid age between 18 and 100.');
      return;
    }

    dispatch({ type: FETCH_TIPS_LOADING });
    dispatch({ type: SET_PROFILE, payload: formData });
    fetchTips(formData);
  };

  const inputClass =
    'w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-2xl rounded-xl">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center">
        Your Wellness Profile
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        Tell us about yourself to receive personalized recommendations.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 30"
            className={`${inputClass} ${
              validationError ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            min="18"
            max="100"
          />
          {validationError && (
            <p className="mt-1 text-sm text-red-500">{validationError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="N/A">Prefer Not to Say</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Primary Wellness Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Stress Reduction">Stress Reduction</option>
            <option value="Better Sleep">Better Sleep</option>
            <option value="Increased Energy">Increased Energy</option>
            <option value="Physical Fitness">Physical Fitness</option>
            <option value="Mindful Eating">Mindful Eating</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Generate My Tips
        </Button>
      </form>
    </div>
  );
};

export default ProfileScreen;
