#!groovy
@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PluggablePipelineBuilder
import com.casumo.jenkins.pipeline.features.release.Release
import com.casumo.jenkins.pipeline.features.Docker
import com.casumo.jenkins.pipeline.features.DeployService

if (env.BRANCH_NAME=="master"){
    try {
        new PluggablePipelineBuilder(this)
            .checkout()
            .customStep('Install dependencies', this.&installDependencies)
            .customStep('Build', this.&runBuild)
            .with(Docker) { it.publishDockerImage() }
            .with(Release) { it.release() }
            .with(DeployService){ it.deployToProduction('frontend-react-stack') }
            .customStep('Rollbar Deploy Tracking', this.&rollbarDeployTracking)
            .build('js-builder')

        slackSend channel: "operations-frontend", color: '#ADFF2F', message:  """
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
    def builder = new PluggablePipelineBuilder(this)
   builder.checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .parallel([
            "Flow": {it.customStepTask('Flow', this.&runFlow)},
            "Lint": {it.customStepTask('Lint', this.&runLint)},
            "Visual Regression": {it.customStepTask('Visual Regression', this.&runChromatic)},
            "Contract Tests": {it.customStepTask('Contract Tests', this.&pact)},
            "Sonar": {it.gradleSonarTask()}
        ])
        .customStep('Build', this.&runBuild)
        .with(Docker) { it.publishDockerImage() }
        .with(Release) { it.release() }
        .with(DeployService){ it.deployToTest('frontend-react-stack') }
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

def runChromatic () {
    sh "yarn chromatic"
}

def sonar(apply_fix=true) {
    try {
        if (env.BRANCH_NAME != 'master'){
            sh "yarn sonar -- sonar.pullrequest.branch=${env.BRANCH_NAME} sonar.pullrequest.key=${env.CHANGE_ID} sonar.pullrequest.github.repository=frontend-react-stack"

        } else {
            sh "yarn sonar"
        }

    } catch (e){
        if (apply_fix){
            sh "sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /home/jenkins/.sonar/native-sonar-scanner/\$(ls -1tr /home/jenkins/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner"
            sonar(false)
        } else {
            throw e
        }
    }
}

def rollbarDeployTracking () {
    def data = """
    {"access_token":"${ROLLBAR_REACT_STACK}","environment":"production","revision":"${GIT_COMMIT}", "local_username":"${env.gitAuthor}"}
    """

    sh "curl --request POST \
        --url https://api.rollbar.com/api/1/deploy/ \
        --header 'content-type: application/json' \
        --data '${data}'"
}
