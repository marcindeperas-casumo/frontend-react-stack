#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Build', this.&npmBuild)
        .customStep('Tests', this.&runTests)
        .gradleDockerPublish()
        .gradleRelease()
        .build()

def npmBuild() {
    sh "yarn && yarn build"
}

def runTests() {
    sh "yarn test:ci"
}
