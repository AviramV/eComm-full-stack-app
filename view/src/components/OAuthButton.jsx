export function OAuthButton({ authProvider, authPath }) {
  const serverURL = import.meta.env.VITE_SERVER_BASE_URL;

  const startAuthProcess = () => {
    window.open(`${serverURL}${authPath}`, "_top", "noopener, noreferrer");
  };

  const provider = authProvider === "google" ? "Google" : "Facebook";

  return (
    <button
      id={authProvider + "-login-button"}
      className="button login-button"
      onClick={startAuthProcess}
    >
      <span className={authProvider + "-logo"}></span>
      {`Continue with ${provider}`}
    </button>
  );
}
