#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .customStep('Flow', this.&runFlow)
        .customStep('Build', this.&runBuild)
        .customStep('Visual Regression', this.&runChromatic)
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

def runChromatic () {
    sh "yarn chromatic"
}
