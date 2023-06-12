const AuthRecoilChecker = () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  if (token !== null) {
    return true;
  }
}

export default AuthRecoilChecker;