def dockerSecretExists(){
    def exists = sh(
        script: "kubectl get secret docker-creds --ignore-not-found=true -o name",
        returnStdout: true
    ).trim()
    return exists != ""
}
    
pipeline {
    agent {
        kubernetes {
            inheritFrom 'k8s_kaniko_agent'
            defaultContainer 'kaniko'
        }
    }

    options {
        disableConcurrentBuilds()        // Limit concurrent builds to 1
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
    // environment {
    //     docker_creds = credentials('DOCKERHUB_CREDS')
    // }

    stages {
        stage('Debug Stage') {
            steps {
                script{
                    sh 'pwd'
                    echo "${JENKINS_HOME}"
                    echo "PATH: $PATH"
                    sh 'git --version'
                    sh 'kubectl get pods'
                    sh 'echo "Starting investigation hold..." && sleep 2000 && echo "Investigation hold complete"'
                }
            }
        }
        // stage('Check and create k8s docker secret') {
        //     steps {
        //         container('k8s'){
        //             script{
        //                 if (dockerSecretExists()) {
        //                     echo "Secret 'docker-creds' exists, continuing pipeline"
        //                     sh 'echo "Starting investigation hold..." && sleep 2000 && echo "Investigation hold complete"'
        //                 } else {
        //                     withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDS', 
        //                                 usernameVariable: 'dockerUsr', 
        //                                 passwordVariable: 'dockerPass')]) {
        //                     sh '''
        //                     echo "$dockerUsr SI PAROLA dockerPass"
        //                     kubectl create secret docker-registry docker-creds \
        //                         --docker-server=https://index.docker.io/v1/ \
        //                         --docker-username=$dockerUsr \
        //                         --docker-password=$dockerPass
        //                         --docker-email=example@yahoo.com
        //                     '''
        //                     }

        //                     echo "Secret 'docker-creds' does NOT exist, created it. Please re-run the job after"
        //                     currentBuild.result = 'SUCCESS'
        //                     currentBuild.description = "Docker secret does NOT exist! Re-run the job!"
        //                     throw new Exception("NO_ERRORS_JUST_RUN_JOB_AGAIN")
        //                 }
        //             }
        //         }
        //     }                
        // }
        stage('Debug Stage 2') {
            steps {
                script{
                    sh 'pwd'
                    echo "${JENKINS_HOME}"
                    echo "PATH: $PATH"
                    // kaniko template command for Dockerfile:
                    // executor --dockerfile=Dockerfile --destination=mateduard/test-kaniko:1.0 --context=.
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