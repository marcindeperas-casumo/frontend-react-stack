#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Tests', this.&runTests)
        .customStep('Build', this.&npmBuild)
        .gradleDockerPublish()
        .gradleRelease()
        .build()

def npmBuild() {
    sh "yarn && yarn build"
}

def runTests() {
    sh "yarn test:ci"
}
