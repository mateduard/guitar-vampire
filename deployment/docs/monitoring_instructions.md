Prometheus & Grafana

1. Create custom dashboard configmap and services that use the K8S DNS routes in `monitoring` folder: 
`kubectl apply -f configmap-dashboard.yaml -f monitoring-services.yaml`

2. Add repos and create namespace
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

3. Deploy Prometheus and Grafana through kube-prometheus-stack from helm
```
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --version 81.2.2 -f values-monitoring.yaml
```