-- Jenkins kubernetes agent settings --
+ Kubernetes plugin necessary!

+ Cloud config:
    Name: kubernetes
    Kubernetes URL: leave empty
    Jenkins URL: http://jenkins-service.default.svc.cluster.local:80/jenkins
    Jenkins tunnel: jenkins-service.default.svc.cluster.local:50000
    Pod retention: Never

+ Pod Templates:
    Name: kaniko_k8s_agent
    Labels: anything     (doesn't matter as the calling the agent by label is deprecated. the new call uses agent's name)
    Container Template:
        - Name: jnlp
        Docker image: jenkins/inbound-agent:latest
        Working directory: /home/jenkins/agent
        - Name: kaniko
        Docker image: jenkins/inbound-agent:latest
        - Name: k8s
        Docker image: alpine/k8s:1.28.4

    ONLY for NON-jnlp containers add the following:
        command to run: cat
        TTY enabled


+ Manage Jenkins -> Security -> TCP port for inbound agents: Fixed 50000
+ Note: Port 50000:50000 on jenkins-service to be opened! (already in manifest but worths mentioning)

executor --dockerfile=Dockerfile --destination=mateduard/test-kaniko:1.0 --context=.