export function loadData(dispatch, user) {
    const token = localStorage.getItem("TOKEN");
    const currentBranch = localStorage.getItem("BRANCH");
    if (!token || !currentBranch) return;
    if (!user._id) return;
}