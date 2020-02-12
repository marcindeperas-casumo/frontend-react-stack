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
    new PipelineBuilder(this)
        .checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .parallel([
            "Flow": {it.customStepTask('Flow', this.&runFlow)},
            "Lint": {it.customStepTask('Lint', this.&runLint)},
            "Visual Regression": {it.customStepTask('Visual Regression', this.&runChromatic)},
            "Contract Tests": {it.customStepTask('Contract Tests', this.&pact)},
            "Sonar": {it.customStepTask('Sonar', this.&sonar)}
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
        sh "yarn sonar -- --prkey=${env.CHANGE_ID} --version=${env.BRANCH_NAME}"
    } catch (e){
        if (apply_fix){
            sh "sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /home/jenkins/.sonar/native-sonar-scanner/\$(ls -1tr /home/jenkins/.sonar/native-sonar-scanner/ | head -1)/bin/sonar-scanner"
            sonar(false)
        } else throw e
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
