-- Jenkins kubernetes agent settings --
+ Kubernetes plugin necessary!

+ Cloud config:
    Name: kubernetes
    Kubernetes URL: leave empty
    Jenkins URL: http://jenkins-service.default.svc.cluster.local:80/jenkins
    Jenkins tunnel: jenkins-service.default.svc.cluster.local:50000
    Pod retention: Never

+ Pod Templates:
    Name: k8s-maven
    Labels: k8s-mvn     (doesn't matter as the calling the agent by label is deprecated. the new call uses name)
    Container Template:
        Name: jnlp
        Docker image: jenkins/inbound-agent:latest
        Working directory: /home/jenkins/agent    
    And ONLY for NON-jnlp containers add the following:
        command to run: cat
        TTY enabled

+ Manage Jenkins -> Security -> TCP port for inbound agents: Fixed 50000
+ Also: Port 50000:50000 on jenkins-service to be opened!

Pipeline example:
```
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.8.1-jdk-11
    command:
    - cat
    tty: true
"""
        }
    }
    stages {
        stage('Test') {
            steps {
                container('maven') {
                    sh 'mvn --version'
                }
            }
        }
    }
}
```