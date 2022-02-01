const storage = {
  saveAuthorization(token) {
    localStorage.setItem("accessToken", token);
  },
  getAuthorization() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  },
  clearAuthorization() {
    localStorage.removeItem("accessToken");
  },
};
export { storage };
