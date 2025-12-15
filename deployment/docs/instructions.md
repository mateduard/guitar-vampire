# INSTRUCTIONS - used from a terminal with conneciton to cluster

1. After cloning the project, switch to `terraform` folder and use `terraform init`, `terraform plan` (recommended) and `terraform apply`.
2. Apply all manifests from `deployment` folder (including 'jenkins' folder if jenkins integration is desired).
2. Replace the IPs in gv-{front,back}-deployment.yaml files under `spec.containers.env` field with the public IP assigned by the cloud provider to the LB service that backs the ingress.
3. Apply the deployment manifests again.

Notes:
- For jenkins instructions, see `jenkins_instructions.md`
- Original nginx controller manifest: https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
- Deployment didn't work on ARM architecture k8s VM workers when tried. Worked on D2ls_v5 VM in MS Azure.