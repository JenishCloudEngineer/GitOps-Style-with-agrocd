# GitOps-Style-with-argocd

cd GitOps-Style-with-argocd

To start 

    minikube start --driver=docker 
    
    kubectl config use-context minikube

To verify pods

     kubectl get nodes

Build Docker image locally

Use the same naming convention as the workflow 

     docker build -t ghcr.io/<your-gh-username>/gitops-node-app:latest ./GitOps-app
     

(Optional) Run container locally just to confirm:

    docker run -d --name gitops-node-app -p 3000:3000 ghcr.io/<your-gh-username>/gitops-node-app:latest

    curl http://localhost:3000/

Delete it after verifing
    
    docker rm -f gitops-node-app
 

Edit the file with latest tag

     nano manifests/deployment.yaml

eg: 
   
this 

     image: ghcr.io/username/gitops-node-app:2959eeec65b4a26ff3f48a4bfea34b3c5c69370f
   
to  

     image: ghcr.io/<your-gh-username>/gitops-node-app:latest

Apply
     
       Deploy to Minikube via kustomize
       kubectl apply -k manifests/

Check:

    kubectl get pods

    kubectl get svc

Expose service via Minikube:

    minikube service gitops-service --url

You’ll get a URL like http://127.0.0.1:xxxxx. Test:

    curl http://127.0.0.1:xxxxx/

Push it to git and add secrects that has your PAT with read, write ppackage permissions and name it GHCR_PAT    

If you need port forwarding, if the link from service didnt work create host by this

    kubectl port-forward svc/gitops-service 8080:80

If you need to check inside the cluster use this

      kubectl run curl --rm -it --image=curlimages/curl --restart=Never -- \
      
      curl http://gitops-service/


To verify the latest image in GHCR
      
      docker pull ghcr.io/<USER>/gitops-node-app:latest
      
      docker images | grep gitops-node-app

To verify the latest image that is used by deployment
      
      kubectl get deployment gitops-node-app -o wide
  
      kubectl describe deployment gitops-node-app | grep -i "Image"


Local Node app:
GET http://localhost:3000/

Docker container (local):
GET http://localhost:3000/

K8s via Minikube service:
GET <output-of-minikube-service>/
(e.g. GET http://127.0.0.1:31482/)

K8s via port-forward:
GET http://localhost:8080/

K8s in-cluster DNS:
GET http://gitops-service.default.svc.cluster.local/
