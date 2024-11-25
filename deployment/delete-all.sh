#!/bin/bash

kubectl delete svc gv-front-service
kubectl delete svc gv-back-service
kubectl delete deployment gv-front-deployment
kubectl delete deployment gv-back-deployment
kubectl delete ingress gv-ingress