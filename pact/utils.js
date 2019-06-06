module.exports = {
  commit: require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim(),
  branch: require("child_process")
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim(),
};
