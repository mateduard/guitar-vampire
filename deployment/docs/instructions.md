1. After creating the k8s cluster, apply all manifests from `deployment` folder
2. Replace the IPs in gv-{front,back}-deployment.yaml under `spec.containers.env` field with the one assigned by the cloud provider to the LB service that backs the ingress.
3. Apply the deployment manifests again.

Notes:
- Original nginx controller manifest: https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml