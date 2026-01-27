Prometheus & Grafana

1. Add repos and create namespace
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
kubectl create namespace monitoring
```

2. Deploy Prometheus and Grafana
```
helm install prometheus prometheus-community/prometheus --namespace monitoring
helm install grafana grafana/grafana --namespace monitoring
```

3. Apply manifests in `monitoring` folder