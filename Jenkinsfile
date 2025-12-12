pipeline {
    agent any

    options {
        // Keep only 5 builds
        buildDiscarder(logRotator(
            numToKeepStr: '5',           // Keep 5 builds
            daysToKeepStr: '',           // No day limit
            artifactNumToKeepStr: '5',   // Keep artifacts for 5 builds
            artifactDaysToKeepStr: ''    // No day limit for artifacts
        ))
    }
    
    triggers { githubPush() }
    
    parameters {
        booleanParam(name: 'createFrontImage', defaultValue: 'false', description: 'Should I create frontend image?')
        booleanParam(name: 'createBackImage', defaultValue: 'false', description: 'Should I create backend image?')
        booleanParam(name: 'deployImages', defaultValue: 'false', description: 'Should I deploy the created images?')
        string(name: 'backTag', defaultValue: 'staging', description: 'Tag to be used if backend image is created.')
        string(name: 'frontTag', defaultValue: 'staging', description: 'Tag to be used if frontend image is created.')
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
                echo "${WORKSPACE}"
            }
        }
        stage('Create Front image and push to Dockerhub') {
            when {
                expression { params.createFrontImage }
            }
            steps {
                echo 'S-a intrat in imagine FRONT'
                image_tag = "${params.frontTag}"
                image_name = "mateduard/k8s-cluster-front"
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDS') {
                        echo 'Logged in to Docker Hub'
                        front_image = docker.build("${image_name}:${image_tag}", "--no-cache .")
                    }
                }
            }
        }
        stage('Create Back image and push to Dockerhub') {
            when {
                expression { params.createBackImage }
            }
            steps {
                image_tag = "${params.backTag}"
                image_name = "mateduard/k8s-cluster-back"
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDS') {
                        echo 'Logged in to Docker Hub'
                        front_image = docker.build("${image_name}:${image_tag}", "--no-cache .")
                        front_image.push()
                    }
                }
                echo 'S-a intrat in imagine BACK'
                sh 'ls'
            }
        }
        stage('Deploy created images') {
            when {
                expression { params.deployImages }
            }
            steps {
                echo 'S-a intrat in deploy'
                sh 'ls'
            }
        }
    }
}