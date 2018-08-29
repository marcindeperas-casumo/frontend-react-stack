#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Install dependencies', this.&installDependencies)
        .customStep('Tests', this.&runTests)
        .customStep('Build', this.&npmBuild)
        .gradleDockerPublish()
        .gradleRelease()
        .build()

def installDependencies() {
    sh "yarn"
}

def npmBuild() {
    sh "yarn build"
}

def runTests() {
    sh "yarn test:ci"
}
