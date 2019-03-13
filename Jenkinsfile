#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .parallel([
                "Flow": {it.customStepTask('Flow', this.&runFlow)},
                "ESlint": {it.customStepTask('ESlint', this.&runESlint)},
                "Visual Regression": {it.customStepTask('Visual Regression', this.&runChromatic)},
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

def runTests() {
    sh "yarn test:ci"
}

def runFlow() {
    sh "yarn flow"
}

def runESlint() {
    sh "yarn lint"
}

def runChromatic () {
    sh "yarn chromatic"
}
