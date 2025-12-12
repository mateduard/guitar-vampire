pipeline {
    agent any
    triggers { githubPush() }
    parameters {
        booleanParam(name: 'createImage', defaultValue: 'false', description: 'Should I create image?')
    }
    environment {
        docker_creds = credentials('DOCKERHUB_CREDS')
    }
    stages {
        stage('Debug Stage') {
            steps {
                echo "${docker_creds}"
                sh 'ls'
                sh 'pwd'
                echo "${JENKINS_HOME}"
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