
# Getting started
----
# 1. Running locally

1. Clone the git repo. Open a terminal window and run
  * `git clone git@github.ibm.com:WH-GovHHS/Call-for-Code-AWEDA.git`

2. Start the application by running
  * `docker-compose up --build`

3. Open up a browser window and enter the uri
  * `http://localhost:8000`

----
# 2. Running the Application

There are two sides to this application.

1. Gathering the information during a natural disaster from the survivors. This can be gathered using a Drone taking images and when it has identified people in the images, it lowers down to talk to the people to gather further information using a Chatbot. The APIs can also be used to gather information from using a mobile app where people in helicopters or people on the ground can also submit images and further information through the Chatbot.

2. The relief coordinators can register using the application and login to view the data gathered by the Drones or other resources. They will be able to use the application as a resource in the aftermath of a natural disaster to provide data-driven insights in order to make an effective and efficient coordination plan and speedily disseminate accurate and verified information during the emergency response.

----
# 3. Deploying the Application to IBM Cloud
----
## 3.1 Gain access to your cluster

1. Create your cluster ... TODO


2. Create a namespace by executing the following command:  

  * `kubectl create -f namespace-dev.json`

Check whether the namespaces got created by executing the following command:

  * `kubectl get namespaces --show-labels | grep name=aweda`

2. Log in to your IBM Cloud account. If you have a federated ID, use ibmcloud login `--sso` to log in to the IBM Cloud CLI.
  * `ibmcloud login -a https://api.eu-de.bluemix.net`
  * `ibmcloud login -a https://api.eu-de.bluemix.net --sso`

3. Target the IBM Cloud Container Service region in which you want to work.
  * `ibmcloud cs region-set eu-central`

4. Get the command to set the environment variable and download the Kubernetes configuration files.
  * `ibmcloud cs cluster-config myclusterDE`

5. Set the KUBECONFIG environment variable. Copy the output from the previous command and paste it in your terminal. The command output should look similar to the following.
  * `export KUBECONFIG=/Users/$USER/.bluemix/plugins/container-service/clusters/myclusterDE/kube-config-mil01-myclusterDE.yml`

Alternatively, you may directly download your kubeconfig files to manually configure the kubernetes cluster context.

6. Verify that you can connect to your cluster by listing your worker nodes.
  * `kubectl get nodes`

---- TODO : Move after deployment section 
## 3.2 Exposing the services
Kubernetes offers a DNS cluster add-on Service that automatically assigns dns names to other Services so you can talk to the Service from any pod in your cluster.

### 3.2.1 Exposing the Services
In the application, we need to expose the vue-frontend and the node-backend services. You can do that by running the following commands:

  * `kubectl expose deployment vue-frontend --type=NodePort --name=vue-frontend-dns`
  * `kubectl expose deployment node-backend --type=NodePort --name=node-backend-dns`
  * `kubectl expose deployment mongo-db --type=NodePort --name=mongo-db-dns`

### 3.2.2 Getting the Services
You can view the ports which are exposed for the services.  
  * `kubectl get services`

Example output: TODO create a table
  * vue-frontend NodePort 172.21.140.193 <none> 8000:`30234`/TCP 15s
    * The port `30234` will be used instead of `8000` inside the container. You will combine that with the IP-Address of the Cluster. e.g. `http://<cluster-id>:30234` after the application is deployed to the cluster.
  * node-backend NodePort 172.21.140.193 <none> 3000:`31491`/TCP 15s
    * The port `31491` will be used instead of `3000` inside the container

### 3.2.2 Updating applications to specify the cluster details

TODO

http://159.122.175.35:30234




----
## 3.3 Build the image and push to your private registry

1. Login to your local Docker daemon into the IBM Cloud Container Registry.
  * `ibmcloud cr login`

2. You will need to build images locally and then push the image to the IBM Cloud.

  2.1. Build the node-backend image by running the following commands:
  * `cd node-backend`
  * `npm install`
  * `docker build -t registry.eu-de.bluemix.net/aweda/node-backend:1 .`

  2.2. Build the vue-frontend image by running the following commands:
  * `cd ..`
  * `cd vue-frontend`
  * `npm install`
  * `docker build -t registry.eu-de.bluemix.net/aweda/vue-frontend:1 .`

 2.3. Push the images to the ibm cloud private registry
  * `docker image ls` - list the images built locally
  * `ibmcloud cr image-list` - List the images pushed to the IBM Cloud Registry

  * `docker push registry.eu-de.bluemix.net/aweda/node-backend:1`
  * `docker push registry.eu-de.bluemix.net/aweda/vue-frontend:1`

3. Verify that your images are in your private registry.
  * `ibmcloud cr image-list`

----
## 3.4 Deploying using Kubernetes to the Cluster

1. Apply the images to the Cluster. Ensure you are in the root directory where the deployment.yaml file exists and run the following:
  * `cd ..`
  * `kubectl apply -f deployment.yaml`

2. Check to list of pods to see if your applications are deployed and running as expected.
  * `kubectl get pods`

Here is an example output:

  | NAME | READY | STATUS | RESTARTS | AGE |
  |:--------|:--- |:------|:--- |:---- |
  |mongo-db-5765666c7b-2bmvt |1/1 |Running | 0 |1m|
  |node-backend-75655d54cc-lctlv | 1/1|  Running| 0 | 1m |
    |vue-frontend-5c47cbd554-jtfsh | 1/1 | Running | 0 | 1m |

3. You can tail the logs for the pods while running the application. Here is a sample command:
    *  `kubectl logs -f <pod-name>``

4. Check the deployments
    * `kubectl get deployments`

Here is an example output:

  | NAME | DESIRED | CURRENT | UP-TO-DATE | AVAILABLE | AGE |
  |:--------|:--- |:------|:--- |:---- | :---- |
  |mongo-db |1 |1 | 1 |1| 7m|
  |node-backend |1 |1 | 1 |1| 7m|
  |vue-frontend |1 |1 | 1 |1| 7m|

5. Known Issue - Database not connecting to node-backend on initial deployment.

To resolve this issue, you just need to delete the pod and it will be recreated. When it is recreated, if you tail the logs you will now see that the database is connected successfully.

Tail the logs for the node-backend pod
    * `kubectl get pods`  
    * `kubectl logs -f <node-backend-pod-id>`

Delete the pod
    * `kubectl delete pod <node-backend-pod-id>`
    * `kubectl get pods`

Tail the logs for the new node-backend pod createReadStream
    * `kubectl logs -f <node-backend-pod-id>`

----
## 3.5 View inside the containers deployed on the IBM Cloud

1. You can run the following interactive command to view inside the container
    * `kubectl get pods`
    * `kubectl exec -it <pod-id> bash`
    * Example: `kubectl exec -it vue-frontend-5c47cbd554-8gwtc /bin/bash`

2. To update any files, you can download vim using the following commands:

    * `apt-get update`
    * `apt-get install vim`
    * Enter `y`

3.
cd src/components
vi Submit.Vue
:155


----

# 4. Running the application

1. Open a browser and enter the following URI:   

  * `http://<container-id>/<vue-frontend-dns-port-number>`
  * `http://159.122.175.35:30234`

----

# 5. Clean up
When you are finished using the application, it is always good to remove the applications which are no longer being used.

1. Remove the deployments on the Cluster
  * `kubectl delete -f deployment.yaml`
  * `kubectl get pods`  

2. Remove the images from IBM Cloud registry
  * `ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/node-backend:1`
  * `ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/vue-frontend:1`
  * `ibmcloud cr image-list`

3. Remove the namespace

kubectl get namespaces
kubectl get namespaces --show-labels

# Delete dev namespace
kubectl delete namespaces dev

4. Remove the cluster  

3. Remove the images not being used on your local machine
  * `docker system prune -a`
  * `y` To delete everything
  * `docker image ls`
----
