# MEVN Stack

Stack consists of Mongo, Express, Vue and Node. The aim of the stack is to allow the users quickly implement bussines logic rather than spending time on time consuming infrastructure setup.

The stack implemtns secure rolebase authorization and registration that is used in conjuction with secure API endpoints.

Stack can be manualy deplyed or it can be build using `docker-compose` functionality that allows for one click production like enviroment for imidiate development.

# Feature List

## DONE
- Private & Public API Endpoints `DONE`
- Public, Private & Role Restricted Views `DONE`

## TODO

- Role Base Authentication `TODO`
- Database Integration `TODO`
- Development / Production Build Modes `TODO`
- Integrated Jenkins File For Quick Automation `TODO`
- Unit Tests `TODO`
- Admin Panel `TODO`
- User Pannel `TODO`

# Deploying the Application to IBM Cloud

## Build the image and push to your private registry

1. Log your local Docker daemon into the IBM Cloud Container Registry.
`ibmcloud cr login`

2. Build and push the image. Choose a repository and tag by which you can identify the image.

Build the node-backend image:
`cd node-backend
npm install
docker build -t registry.eu-de.bluemix.net/aweda/node-backend:1 .
docker push registry.eu-de.bluemix.net/aweda/node-backend:1`

Build the vue-frontend image:
`cd ..
cd vue-frontend
npm install
docker build -t registry.eu-de.bluemix.net/aweda/vue-frontend:1 .
docker push registry.eu-de.bluemix.net/aweda/vue-frontend:1`

3. Verify that your images are in your private registry.
ibmcloud cr image-list

## Gain access to your cluster
### Prerequisites
Download and install a few CLI tools and the IBM Kubernetes Service plug-in.
`curl -sL https://ibm.biz/idt-installer | bash`

### Gain access to your cluster
1. Log in to your IBM Cloud account.
`ibmcloud login -a https://api.eu-de.bluemix.net`

If you have a federated ID, use ibmcloud login --sso to log in to the IBM Cloud CLI.

2. Target the IBM Cloud Container Service region in which you want to work.
`ibmcloud cs region-set eu-central`

3. Get the command to set the environment variable and download the Kubernetes configuration files.
`ibmcloud cs cluster-config myclusterDE`

4. Set the KUBECONFIG environment variable. Copy the output from the previous command and paste it in your terminal. The command output should look similar to the following.
`export KUBECONFIG=/Users/$USER/.bluemix/plugins/container-service/clusters/myclusterDE/kube-config-mil01-myclusterDE.yml`

Alternatively, you may directly download your kubeconfig files to manually configure the kubernetes cluster context.

5. Verify that you can connect to your cluster by listing your worker nodes.
`kubectl get nodes`

6. Apply the images to the Cluster
Ensure you are in the root directory where the deployment.yaml file exists and run the following:
`cd ..
kubectl apply -f deployment.yaml`



## View your cluster on IBM Cloud UI

`kubectl get pods`

kubectl get deployments

tail the logs:
kubectl logs -f node-backend-75655d54cc-nr28m

Expecting

NAME                            READY     STATUS    RESTARTS   AGE
mongo-db-5765666c7b-2bmvt       1/1       Running   0          1m
node-backend-75655d54cc-95mpd   1/1       Running   0          1m
node-backend-75655d54cc-lctlv   1/1       Running   0          1m
vue-frontend-5c47cbd554-jtfsh   1/1       Running   0          1m
vue-frontend-5c47cbd554-q26zk   1/1       Running   0          1m



Create a Service object that exposes the deployment:

kubectl expose deployment vue-frontend --type=NodePort --name=external-service

kubectl get services
external-service   NodePort    172.21.140.193   <none>        8000:30234/TCP   15s

159.122.175.35:30234
159.122.175.35:31491/public/watsonImageRecognition


7. Remove the deployments on the Cluster
`kubectl delete -f deployment.yaml`
docker system prune -a
y

docker image ls

Remove up the images from IBM Cloud
ibmcloud cr images
ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/node-backend:1
ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/vue-frontend:1

view inside the container:
`kubectl exec -it vue-frontend-5c47cbd554-8gwtc /bin/bash`
