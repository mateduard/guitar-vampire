pipeline {
    agent { label 'master' }
    triggers { githubPush() }
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}