-- Jenkins kubernetes agent settings --
+ Kubernetes plugin necessary!

+ Cloud config:
    Name: kubernetes
    Kubernetes URL: leave empty
    Jenkins URL: http://jenkins-service.default.svc.cluster.local:80/jenkins
    Jenkins tunnel: jenkins-service.default.svc.cluster.local:50000
    Pod retention: Never

+ Pod Template:
    Name: k8s-kaniko-git
    Labels: anything/empty     (doesn't matter as calling the agent by label is deprecated. the new call uses agent's name)
    Upload the code from the file `jenkins_k8s_pod_template_worker.yaml` to the Raw YAML field.
    In case worker image is not available anymore, build and push `Dockerfile-jenkins-main-worker` from the current directory.

+ Manage Jenkins -> Security -> TCP port for inbound agents: Fixed 50000
+ Note: Port 50000:50000 on jenkins-service to be opened! (already in manifest but worths mentioning)

+ Create the multibranch pipeline:
    - Create credentials "DOCKERHUB_CREDS" and "GITHUB_CREDS" of type 'username and password' with their specific tokens.
    - Behaviors: 
        1. Discover branches: Exclude branches that are also filed as PRs
        2. Discover pull requests from origin: The current pull request revision
    - Go to Github project -> settings -> Webhooks -> Payload URL `http://[jenkins-IP]/jenkins/github-webhook/`