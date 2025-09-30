import { useWellnessState, useWellnessDispatch } from "../contexts/WellnessContext";
import { SET_CURRENT_SCREEN } from "../contexts/actions";

const NavBar = () => {
  const { currentScreen, isLoading } = useWellnessState();
  const { dispatch } = useWellnessDispatch();

  const goTo = (screen) => {
    if (!isLoading) {
      dispatch({ type: SET_CURRENT_SCREEN, payload: screen });
    }
  };

  const navItems = [
    { label: "Profile", screen: "Profile" },
    { label: "Recommendations", screen: "TipBoard" },
    { label: "Saved Tips", screen: "SavedTips" },
  ];

  return (
    <nav className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Branding */}
        <h1
          className="text-lg sm:text-xl font-extrabold tracking-wide cursor-pointer hover:text-yellow-300 transition-colors text-center sm:text-left"
          onClick={() => goTo("Profile")}
        >
          🧘 AI Wellness Board
        </h1>

        {/* Nav items */}
        <div className="flex justify-center sm:justify-end flex-wrap gap-2">
          {navItems.map(({ label, screen }) => {
            const isActive = currentScreen === screen;
            return (
              <button
                key={screen}
                onClick={() => goTo(screen)}
                disabled={isActive}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base
                  ${
                    isActive
                      ? "bg-white text-indigo-700 cursor-default shadow-sm"
                      : "hover:bg-indigo-500 hover:text-white"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
