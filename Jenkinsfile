#!groovy

@Library('casumo-jenkins-libraries') _

import com.casumo.jenkins.PluggablePipelineBuilder
import com.casumo.jenkins.pipeline.features.DeployHelmService
import com.casumo.jenkins.pipeline.features.Docker
import com.casumo.jenkins.pipeline.features.release.Release

if (env.BRANCH_NAME == "master") {
    try {
        new PluggablePipelineBuilder(this)
        .checkout()
        .customStep('Install node and yarn', {
            bash "set +x; nvm install && nvm alias default \$(node -v)"
            bash "npm install --global yarn"
        })
        .customStep('Install dependencies', {
            bash "yarn"
        })
        .customStep('Build', {
            bash "yarn build"
        })
        .with(Docker) { it.publishDockerImage() }
        .with(Release) { it.release() }
        .with(DeployHelmService) { it.deploy('live') }
        .customStep('Rollbar Deploy Tracking', { rollbarDeployTracking() })
        .customStep('Rollbar send source maps', { rollbarSendSourceMaps() })
        .build('nvm-builder')

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
        bash "set +x; nvm install && nvm alias default \$(node -v)"
        bash "npm install --global yarn"
    })
    .customStep('Install dependencies', {
        bash "yarn"
    })
    .parallel([
            "Tests": { it.customStepTask('Tests', {
                bash "yarn test:ci"
            }) },
            "Typescript": { it.customStepTask('Typescript', {
                bash "yarn tsc"
            }) },
            "Lint": { it.customStepTask('Lint', {
                bash "yarn lint"
            }) },
                // uncomment after adding first pact test
                // "Contract Tests"   : { it.customStepTask('Contract Tests', this.&pact) }
    ])
    .customStep('Build', {
        bash "yarn build"
    })
    .with(Docker) { it.publishDockerImage() }
    .with(Release) { it.release() }
    .with(DeployHelmService) { it.deploy('test') }
    .build('nvm-builder')
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

        bash "curl --request POST \
            --url https://api.rollbar.com/api/1/deploy/ \
            --header 'content-type: application/json' \
            --data '${data}'"
        }
}

def rollbarSendSourceMaps() {
    withCredentials([string(credentialsId: 'ROLLBAR_REACT_STACK', variable: 'ROLLBAR_REACT_STACK')]) {
        bash """
        set +x
        set -e
        cd ./build/react-stack/js
        for i in \$(find . -name '*.map'); do
            source_map_file=\$(echo \$i | sed 's/^.\\///')
            minified_file=\$(echo \$source_map_file | sed 's/.map//')

            curl https://api.rollbar.com/api/1/sourcemap \
                -s \
                -F access_token="${ROLLBAR_REACT_STACK}" \
                -F version="${GIT_COMMIT}" \
                -F minified_url="//www.casumo.com/react-stack/js/\$minified_file" \
                -F source_map=@"\$source_map_file"
            
            curl https://api.rollbar.com/api/1/sourcemap \
                -s \
                -F access_token="${ROLLBAR_REACT_STACK}" \
                -F version="${GIT_COMMIT}" \
                -F minified_url="//www.casumo.es/react-stack/js/\$minified_file" \
                -F source_map=@"\$source_map_file"
        done
        """
    }
}
