#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PluggablePipelineBuilder
import com.casumo.jenkins.pipeline.features.DeployService
import com.casumo.jenkins.pipeline.features.Docker
import com.casumo.jenkins.pipeline.features.release.Release

if (env.BRANCH_NAME == "master") {
    try {
        new PluggablePipelineBuilder(this)
                .checkout()
                .customStep('Install dependencies', this.&installDependencies)
                .customStep('Build', this.&runBuild)
                .with(Docker) { it.publishDockerImage() }
                .with(Release) { it.release() }
                .with(DeployService) { it.deployToProduction('frontend-react-stack') }
                .customStep('Rollbar Deploy Tracking', this.&rollbarDeployTracking)
                .build('js-builder')

        slackSend channel: "operations-frontend", color: '#ADFF2F', message: """
Deployed *frontend-react-stack* to production on behalf of *${env.gitAuthor}*! :dancingpanda:
Changes: ${RUN_CHANGES_DISPLAY_URL}
"""
    } catch (ex) {
        slackSend channel: "operations-frontend", color: '#f05e5e', message: """
*frontend-react-stack* deployment failed - ${BUILD_URL}.
Started by: *${env.gitAuthor}* :eyes:
"""
        throw ex
    }
} else {
    new PluggablePipelineBuilder(this)
            .checkout()
            .customStep('Install dependencies', this.&installDependencies)
            .customStep('Tests', this.&runTests)
            .parallel([
                    "Flow"             : { it.customStepTask('Flow', this.&runFlow) },
                    "Lint"             : { it.customStepTask('Lint', this.&runLint) },
                    "Visual Regression": { it.customStepTask('Visual Regression', this.&runChromatic) },
                    // uncomment after adding first pact test
                    // "Contract Tests"   : { it.customStepTask('Contract Tests', this.&pact) }
            ])
            .customStep('Build', this.&runBuild)
            .with(Docker) { it.publishDockerImage() }
            .with(Release) { it.release() }
            .with(DeployService) { it.deployToTest('frontend-react-stack') }
            .build('js-builder')
}

def installDependencies() {
    sh "yarn"
}

def runBuild() {
    sh "yarn build"
}

def pact() {
    sh "yarn pact:ci"
}

def runTests() {
    sh "yarn test:ci"
}

def runFlow() {
    sh "yarn flow check"
}

def runLint() {
    sh "yarn lint"
}

def runChromatic() {
    sh "yarn chromatic"
}

def rollbarDeployTracking() {
    def data = """
    {"access_token":"${ROLLBAR_REACT_STACK}","environment":"production","revision":"${GIT_COMMIT}", "local_username":"${env.gitAuthor}"}
    """

    sh "curl --request POST \
        --url https://api.rollbar.com/api/1/deploy/ \
        --header 'content-type: application/json' \
        --data '${data}'"
}
