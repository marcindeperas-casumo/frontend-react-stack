module.exports = {
  commitSHA: require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim(),
  branchName: require("child_process")
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim(),
};
