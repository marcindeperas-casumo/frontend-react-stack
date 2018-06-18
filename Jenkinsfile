#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PipelineBuilder

new PipelineBuilder(this)
        .checkout()
        .customStep('Build', this.&npmBuild)
        .gradleDockerPublish()
        .gradleRelease()
        .build()

def npmBuild() {
    sh "yarn && yarn build"
}
