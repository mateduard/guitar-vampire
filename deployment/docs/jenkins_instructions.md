-- Jenkins kubernetes agent settings --
+ Kubernetes plugin necessary!

+ Cloud config:
    Name: kubernetes
    Kubernetes URL: leave empty
    Jenkins URL: http://jenkins-service.default.svc.cluster.local:80/jenkins
    Jenkins tunnel: jenkins-service.default.svc.cluster.local:50000
    Pod retention: Never

+ Pod Template:
    Name: k8s_kaniko_agent
    Labels: anything/empty     (doesn't matter as the calling the agent by label is deprecated. the new call uses agent's name)
    Upload the code from the file `jenkins_k8s_pod_template_worker.yaml` to the Raw YAML field.

+ Manage Jenkins -> Security -> TCP port for inbound agents: Fixed 50000
+ Note: Port 50000:50000 on jenkins-service to be opened! (already in manifest but worths mentioning)