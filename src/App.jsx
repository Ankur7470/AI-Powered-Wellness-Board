import "./App.css";
import { useWellnessState } from "./contexts/WellnessContext";
import NavBar from "./components/Navbar";
import ProfileScreen from "./screens/ProfileScreen";
import TipBoardScreen from "./screens/TipBoardScreen";
import DetailScreen from "./screens/DetailScreen";
import SavedTipsScreen from "./screens/SavedTipsScreen";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const { currentScreen, isLoading, error } = useWellnessState();

  const renderScreen = () => {
    switch (currentScreen) {
      case "Profile":
        return <ProfileScreen />;
      case "TipBoard":
        return <TipBoardScreen />;
      case "Detail":
        return <DetailScreen />;
      case "SavedTips":
        return <SavedTipsScreen />;
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation */}
      <NavBar />

      {/* Main content */}
      <div className="py-10 max-w-6xl mx-auto px-4">
        {/* Global Loading/Error Handling */}
        {isLoading && currentScreen !== "Profile" ? (
          <div className="flex justify-center items-center h-64">
            <LoadingIndicator />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <ErrorMessage message={error} />
          </div>
        ) : (
          renderScreen()
        )}
      </div>
    </div>
  );
}

export default App;
