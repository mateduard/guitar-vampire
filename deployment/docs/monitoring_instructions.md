Prometheus & Grafana

1. Add repos and create namespace
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

2. Deploy Prometheus and Grafana through kube-prometheus-stack from helm
```
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring
```

3. Apply manifests from `monitoring` folder