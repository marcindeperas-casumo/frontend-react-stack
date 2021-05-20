#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PluggablePipelineBuilder
import com.casumo.jenkins.pipeline.features.DeployService
import com.casumo.jenkins.pipeline.features.Docker
import com.casumo.jenkins.pipeline.features.release.Release

if (env.BRANCH_NAME == "master") {
    try {
        new PluggablePipelineBuilder(this)
        .checkout()
        .customStep('Install node version', {
            shell("set +x; nvm install")
        })
        .customStep('Install yarn', {
            shell("npm install --global yarn")
        })
        .customStep('Install dependencies', {
            shell("yarn")
        })
        .customStep('Build', {
            shell("yarn build")
        })
        .with(Docker) { it.publishDockerImage() }
        .with(Release) { it.release() }
        .with(DeployService) { it.deployToProduction('frontend-react-stack') }
        .customStep('Rollbar Deploy Tracking', { rollbarDeployTracking() })
        .customStep('Rollbar send source maps', { rollbarSendSourceMaps() })
                .build('nvm-ec2-builder')

        slackSend channel: "operations-frontend", color: '#ADFF2F', message: """
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
    new PluggablePipelineBuilder(this)
    .checkout()
    .customStep('Install node version', {
        shell("set +x; nvm install")
    })
    .customStep('Switch nvm to use correct version', {
        shell("nvm use")
    })
    .customStep('Install yarn', {
        shell("npm install --global yarn")
    })
    .customStep('Install dependencies', {
        shell("yarn")
    })
        .parallel([
            "Tests": { it.customStepTask('Tests', {
                shell("yarn test:ci")
            }) },
            "Typescript": { it.customStepTask('Typescript', {
                shell("yarn tsc")
            }) },
            "Lint": { it.customStepTask('Lint', {
                shell("yarn lint")
            }) },
                // uncomment after adding first pact test
                // "Contract Tests"   : { it.customStepTask('Contract Tests', this.&pact) }
        ])
    .customStep('Build', {
        shell("yarn build")
    })
        .with(Docker) { it.publishDockerImage() }
        .with(Release) { it.release() }
        .with(DeployService) { it.deployToTest('frontend-react-stack') }
        .build('nvm-ec2-builder')
}

def rollbarDeployTracking() {
    withCredentials([string(credentialsId: 'ROLLBAR_REACT_STACK', variable: 'ROLLBAR_REACT_STACK')]) {
        def data = """
        {
           "access_token" : "${ROLLBAR_REACT_STACK}",
           "environment" : "production",
           "revision":"${GIT_COMMIT}", 
           "local_username" : "${env.gitAuthor}"
        }
        """.replace('\n',  '')

        shell("curl --request POST \
            --url https://api.rollbar.com/api/1/deploy/ \
            --header 'content-type: application/json' \
            --data '${data}'")
        }
}

def rollbarSendSourceMaps() {
    withCredentials([string(credentialsId: 'ROLLBAR_REACT_STACK', variable: 'ROLLBAR_REACT_STACK')]) {
        sh """
        #!/bin/bash
        set +x
        set -e
        cd ./build/react-stack/js
        for source_map_file in \$(find . -name '*.map'); do
            minified_file=\$(echo \$source_map_file | sed 's/.map//')

            curl https://api.rollbar.com/api/1/sourcemap \
                -s \
                -F access_token="${ROLLBAR_REACT_STACK}" \
                -F version="${GIT_COMMIT}" \
                -F minified_url="\$minified_file" \
                -F source_map=@"\$source_map_file"
        done
        """
    }
}

def shell(cmd) {
    sh """
    set +x
    cd ..
    export NVM_DIR="$HOME/.nvm"
    . ~/.nvm/nvm.sh
    cd -
    set -x
    ${cmd}"""
}
