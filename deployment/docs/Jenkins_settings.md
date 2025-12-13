-- Jenkins kubernetes agent settings --

Name: k8s-cloud
Kubernetes URL: leave empty
Jenkins URL: http://jenkins-service.default.svc.cluster.local:80/jenkins
Jenkins tunnel: jenkins-service.default.svc.cluster.local:50000
Pod retention: Never

+ Pod Templates:
    Name: k8s-agent
    Labels: k8s
    Container Template:
        Name: jnlp
        Docker image: jenkins/inbound-agent:latest
        Working directory: /home/jenkins/agent    

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
  - name: docker
    image: docker:latest
"""
        }
    }
    stages {
        stage('ECHO?') {
            steps {
                container('docker') {
                    echo "I did it!"
                }
            }
        }
    }
}
```