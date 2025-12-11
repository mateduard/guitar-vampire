pipeline {
    // agent { label 'master' }
    triggers { githubPush() }
    parameters {
        booleanParam(name: 'createImage', defaultValue: 'false', description: 'Should I create image?')
    }
    stages {
        stage('Check if code is cloned') {
            steps {
                echo 'Hello World!'
                sh 'ls'
            }
        }
        stage('Create and push image to Dockerhub') {
            steps {
                echo 'Hello World!'
                sh 'ls'
            }
        }
        stage('Create image') {
            steps {
                echo 'Hello World!'
                sh 'ls'
            }
        }
    }
}