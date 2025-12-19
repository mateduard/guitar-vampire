pipeline {
    agent {
        kubernetes {
            inheritFrom 'kaniko_k8s_agent'
            defaultContainer 'kaniko'
        }
    }

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
        string(name: 'frontImgTag', defaultValue: '', description: 'Tag to be used if frontend image is created.')
        booleanParam(name: 'createBackImage', defaultValue: 'false', description: 'Should I create backend image?')
        string(name: 'backImgTag', defaultValue: '', description: 'Tag to be used if backend image is created.')
        booleanParam(name: 'deployImages', defaultValue: 'false', description: 'Should I deploy the created images?')
    }
    environment {
        docker_creds = credentials('DOCKERHUB_CREDS')
    }
    stages {
        stage('Debug Stage') {
            steps {
                script{
                    echo "${docker_creds}"
                    sh 'ls'
                    sh 'pwd'
                    echo "${JENKINS_HOME}"
                    echo "${WORKSPACE}"
                    echo "PATH: $PATH"
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDS', usernameVariable: 'usr', passwordVariable: 'pass')]) {
                        sh "echo $usr"
                        sh "echo $pass"
                    }
                }
            }
        }
        stage('Add kubectl') {
            steps {
                container('k8s'){
                    script{
                        sh 'pwd'
                        sh 'kubectl version'
                        sh 'kubectl get pods'
                    }
                }
            }                
        }
        stage('Create Front image and push to Dockerhub') {
            when {
                expression { params.createFrontImage }
            }
            steps {
                echo 'S-a intrat in imagine FRONT'
                script {
                image_tag = "${params.frontImgTag}"
                image_name = "mateduard/k8s-cluster-front"
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDS') {
                        echo 'Logged in to Docker Hub'
                        front_image = docker.build("${image_name}:${image_tag}", "--no-cache ${WORKSPACE}/guitarvampire-app")
                        front_image.push()
                    }
                }
            }
        }
        stage('Create Back image and push to Dockerhub') {
            when {
                expression { params.createBackImage }
            }
            steps {
                script {
                image_tag = "${params.backImgTag}"
                image_name = "mateduard/k8s-cluster-back"
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDS') {
                        echo 'Logged in to Docker Hub'
                        back_image = docker.build("${image_name}:${image_tag}", "--no-cache ${WORKSPACE}/server")
                        back_image.push()
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