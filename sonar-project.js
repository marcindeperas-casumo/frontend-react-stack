const version = "";
const projectName = "frontend-react-stack";
const testFiles = "**/*.stories.js, **/*.test.js";
const sonarQubeConfig = {
  serverUrl: "http://sonar.casumo.cloud/",
  options: {
    "sonar.projectKey": projectName,
    "sonar.projectName": projectName,
    "sonar.sources": "src",
    "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
    "sonar.javascript.exclusions": "**/__mocks__/*.js",
    "sonar.coverage.exclusions": testFiles,
    "sonar.cpd.exclusions": testFiles,
  },
};

if (version !== "master") {
  // eslint-disable-next-line fp/no-mutation
  sonarQubeConfig.options["sonar.pullrequest.branch"] = version;
  // eslint-disable-next-line fp/no-mutation
  sonarQubeConfig.options["sonar.pullrequest.github.repository"] = projectName;
}

const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(sonarQubeConfig, () => {});
