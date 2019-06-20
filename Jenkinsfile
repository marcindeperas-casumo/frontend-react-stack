#!groovy
@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

if (env.BRANCH_NAME=="master"){
    try {
        new PipelineBuilder(this)
            .checkout()
            .customStep('Install dependencies', this.&installDependencies)
            .customStep('Build', this.&runBuild)
            .gradleDockerPublish()
            .gradleRelease()
            .deployToProduction('frontend-react-stack')
            .build('js-builder')

        slackSend channel: "operations-frontend", color: '#ADFF2F', message:  """
Deployed *mobile-react-stack* to production on behalf of *${env.gitAuthor}*! :dancingpanda: 
Changes: ${RUN_CHANGES_DISPLAY_URL}
"""         
        } catch (ex) {
        slackSend channel: "operations-frontend", color: '#f05e5e', message: """
*mobile-react-stack* deployment failed - ${BUILD_URL}. 
Started by: *${env.gitAuthor}* :eyes:
"""
        throw ex
    }
} else {
    new PipelineBuilder(this)
        .checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .parallel([
            "Flow": {it.customStepTask('Flow', this.&runFlow)},
            "Lint": {it.customStepTask('Lint', this.&runLint)},
            "Visual Regression": {it.customStepTask('Visual Regression', this.&runChromatic)},
            "Sonar": {it.gradleSonarTask()}
        ])
        .customStep('Build', this.&runBuild)
        .gradleDockerPublish()
        .gradleRelease()
        .deployToTest('frontend-react-stack')
        .build('js-builder')
}

def installDependencies() {
    sh "yarn"
}

def runBuild() {
    sh "yarn build"
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
