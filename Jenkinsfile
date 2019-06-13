#!groovy
@Library('casumo-jenkins-libraries') _
import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
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
        .gradleDockerPublish()
        .gradleRelease()
        .build('js-builder') // https://github.com/Casumo/jenkins-js-builder/blob/master/Dockerfile

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
