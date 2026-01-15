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
            inheritFrom 'k8s-kaniko-git'
            defaultContainer 'main-worker'
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
        string(name: 'frontImgVersion', defaultValue: '', description: 'Frontend image version. REQUIRED if building image!!')
        booleanParam(name: 'createBackImage', defaultValue: 'false', description: 'Should I create backend image?')
        string(name: 'backImgVersion', defaultValue: '', description: 'Backend image version. REQUIRED if building image!!')
        booleanParam(name: 'deployImages', defaultValue: 'false', description: 'Should I deploy the created images?')
    }
    environment {
        branch_test_name = "release/1.22"
    }

    stages {
        stage('Setup workspace and variables'){
            steps {
                script{
                    sh 'pwd'
                    sh 'ls'
                    sh "git config --global --add safe.directory ${WORKSPACE}"
                    commitHash = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    echo "${commitHash}"
                }
            }
        }
        stage('Debug Stage') {
            steps {
                script{
                    sh 'pwd'
                    echo "${JENKINS_HOME}"
                    echo "PATH: $PATH"
                    sh 'git --version'
                    sh 'kubectl get pods'
                    // sh 'echo "Starting investigation hold..." && sleep 2000 && echo "Investigation hold complete"'
                }
            }
        }
        stage('Check and create k8s docker secret') {
            steps {
                script{
                    if (dockerSecretExists()) {
                        echo "Secret 'docker-creds' exists, resuming the pipeline"
                        // sh 'echo "Starting investigation hold..." && sleep 2000 && echo "Investigation hold complete"'
                    } else {
                        withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDS', 
                                    usernameVariable: 'dockerUsr', 
                                    passwordVariable: 'dockerPass')]) {
                        sh '''
                        echo "$dockerUsr SI PAROLA dockerPass"
                        kubectl create secret docker-registry docker-creds \
                            --docker-server=https://index.docker.io/v1/ \
                            --docker-username=$dockerUsr \
                            --docker-password=$dockerPass
                        '''
                        }
                        echo "Secret 'docker-creds' did NOT exist, created it. Please re-run the job after"
                        currentBuild.result = 'SUCCESS'
                        currentBuild.description = "Docker secret does NOT exist! Re-run the job!"
                        throw new Exception("NO_ERRORS_JUST_RUN_JOB_AGAIN")
                    }
                }
            }                
        }
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
                echo 'Build and push FRONTEND image'
                script {
                    if (!params.frontImgVersion) {
                        throw new Exception("FRONTEND IMAGE VERSION NOT SPECIFIED. TRY AGAIN")
                    } else {
                        if (env.BRANCH_NAME.startsWith('release/')){
                            image_tag = "${params.frontImgVersion}"
                        } else {
                            image_tag = "${params.frontImgVersion}-${commitHash}"
                        }
                    }
                    fe_image_name = "mateduard/k8s-cluster-front:${image_tag}"

                    sh "executor --dockerfile=./guitarvampire-app/Dockerfile --destination=${fe_image_name} --context=./guitarvampire-app"
                }
            }
        }
        stage('Create Back image and push to Dockerhub') {
            when {
                expression { params.createBackImage }
            }
            steps {
                echo 'Build and push BACKEND image'
                script {
                    if (!params.backImgVersion) {
                        throw new Exception("BACKEND IMAGE VERSION NOT SPECIFIED. TRY AGAIN")
                    } else {
                        if (env.BRANCH_NAME.startsWith('release/')){
                            image_tag = "${params.backImgVersion}"
                        } else {
                            image_tag = "${params.backImgVersion}-${commitHash}"
                        }
                    }
                    be_image_name = "mateduard/k8s-cluster-back:${image_tag}"
                
                sh "executor --dockerfile=./server/Dockerfile --destination=${be_image_name} --context=./server"
                }
            }
        }
        stage('Deploy created images') {
            when {
                expression { params.deployImages}
            }
            steps {
                script {
                    echo 'Deploy FE and/or BE image/s'
                    if(!params.createFrontImage){
                        fe_image_name = "mateduard/k8s-cluster-front:${params.frontImgVersion}"
                    }
                     if(!params.createBackImage){
                        be_image_name = "mateduard/k8s-cluster-back:${params.backImgVersion}"
                    }
                    if (params.frontImgVersion){
                        sh "sed -i 's|mateduard/k8s-cluster-front:1.5|${fe_image_name}|g' ./deployment/gv-front-deployment.yaml"
                        sh 'kubectl apply -f ./deployment/gv-front-deployment.yaml'
                        sh 'kubectl rollout status deployment/gv-front --timeout=300s'
                        echo "Frontend image deployed"
                    }
                    if (params.backImgVersion){
                        sh "sed -i 's|mateduard/k8s-cluster-back:1.5|${be_image_name}|g' ./deployment/gv-back-deployment.yaml"
                        sh 'kubectl apply -f ./deployment/gv-back-deployment.yaml'
                        sh 'kubectl rollout status deployment/gv-back --timeout=300s'
                        echo "Backend image deployed"
                    }
                }
            }
        }
    }
}