
# Getting started
----
# 1. Running the AWEDA application locally

1. Clone the git repo. Open a terminal window and run
  * `git clone git@github.ibm.com:WH-GovHHS/Call-for-Code-AWEDA.git`

2. Start the application by running
  * `docker-compose up --build`

3. From a browser window, enter the URI:
  * `http://localhost:8000`

----
# 2. Running the Application

There are two sides to this application.

1. Gathering the information during a natural disaster from the survivors. This can be gathered using a Drone taking images and when it has identified people in the images, it lowers down to talk to the people to gather further information using a Chatbot. The APIs can also be used to gather information from using a mobile app where people in helicopters or people on the ground can also submit images and further information through the Chatbot.

2. The relief coordinators can register using the application and login to view the data gathered by the Drones or other resources. They will be able to use the application as a resource in the aftermath of a natural disaster to provide data-driven insights in order to make an effective and efficient coordination plan and speedily disseminate accurate and verified information during the emergency response.

----
# 3. Deploying the AWEDA Application to the IBM Cloud
----
## 3.1 Gain access to your cluster

1. Create a cluster
  * Login to your IBM Cloud Account.
  * From the Menu, select Containers and click the `Create a cluster` button.
  * Enter the location you want to create the cluster, update the name of the cluster if you don't want it to be specified with the default name e.g. `myclusterDE` and click `Create`. This will take a few minutes to create.

2. Create a namespace
  * From Registry > Namespaces > Create namespace and create a namespace called `aweda`.

3. Log in to your IBM Cloud account. If you have a federated ID, use ibmcloud login `--sso` to log in to the IBM Cloud CLI.
  * `ibmcloud login -a https://api.eu-de.bluemix.net`
  * `ibmcloud login -a https://api.eu-de.bluemix.net --sso`

4. Target the IBM Cloud Container Service region in which you want to work.
  * `ibmcloud cs region-set eu-central`

5. Get the command to set the environment variable and download the Kubernetes configuration files.
  * `ibmcloud cs cluster-config myclusterDE`

6. Set the KUBECONFIG environment variable. Copy the output from the previous command and paste it in your terminal. The command output should look similar to the following.
  * `export KUBECONFIG=/Users/$USER/.bluemix/plugins/container-service/clusters/myclusterDE/kube-config-mil01-myclusterDE.yml`

Alternatively, you may directly download your kubeconfig files to manually configure the kubernetes cluster context.

7. Verify that you can connect to your cluster by listing your worker nodes.
  * `kubectl get nodes`

----
## 3.2 Build the image and push to your private registry

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
## 3.3 Deploying using Kubernetes to the Cluster

1. Apply the images to the Cluster. Ensure you are in the root directory where the `deployment.yaml` file exists and run the following:
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

----
## 3.4 Updating applications to specify the cluster details
In order for the application frontend to talk to the backend on the IBM Cloud, you will need to perform two tasks:

  1.  Expose the services
  2.  Update the vue-frontend (Submit.vue and Report.vue) files to specify the `endpoint_hostname` and the `endpoint_port`.

----
### 3.4.1 Exposing the services

Kubernetes offers a DNS cluster add-on Service that automatically assigns dns names to other Services so you can talk to the Service from any pod in your cluster.

For the AWEDA application, we need to expose the vue-frontend and the node-backend services. If you want to view what is in the mongo-db using an application such as (https://www.mongodb.com/products/compass), you will need to expose the mongo-db port as well.

You can do that by running the following commands:

  * `kubectl expose deployment vue-frontend --type=NodePort --name=vue-frontend-dns`
  * `kubectl expose deployment node-backend --type=NodePort --name=node-backend-dns`
  * `kubectl expose deployment mongo-db --type=NodePort --name=mongo-db-dns`

### 3.2.2 Getting the Services
You can view the ports which are exposed for the services.  
  * `kubectl get services`

Example output:

| NAME | TYPE | CLUSTER-IP | EXTERNAL_IP | PORT(S) | AGE |
|:--------|:--- |:------|:--- |:---- | :---- |
|mongo-db-dns |NodePort |172.21.188.13 | <none> |27017:31760/TCP| 7m|
|node-backend-dns |NodePort |172.21.127.149 | <none> |3000:31491/TCP| 7m|
|vue-frontend-dns |NodePort |172.21.140.193 | <none> |8000:30234/TCP| 7m|

----
### 3.4.2 Update the vue-frontend files

There are two files which require for the global variables to be updated to point to the IBM Cloud configurations.

1. You will need to retrieve the cluster public id.

  * From the IBM Cloud UI, select the Menu > Containers > Clusters > myclusterDE > Worker Nodes, copy the `Public IP`. This will be used in the next step.

2. Update the files

  * `cd vue-frontend/src/components`
  * Edit the `Submit.vue` and the `Report.vue` files to update the following properties:
    1. `endpoint_hostname` : `<cluster-public-id>`
      * e.g. `endpoint_hostname : '159.122.175.35'`
    2. `endpoint_port` : `<service-node-backend-dns>`
      * e.g. `endpoint_port : '31491'`

----
### 3.4.3 Build the vue-frontend files changes and push to the registry

1. Build the vue-frontend image by running the following commands:

* `cd vue-frontend`
* `docker build -t registry.eu-de.bluemix.net/aweda/vue-frontend:1 .`

2.3. Push the images to the ibm cloud private registry

* `docker push registry.eu-de.bluemix.net/aweda/vue-frontend:1`
----
### 3.4.4 Re-deploy the application
Re-deploy the application to take down the latest changes. Note the deployment.yaml file specified the `imagePullPolicy: Always` therefore it will always take down the latest changes.

****NOTE to Daniel ***
Do you have to run remove deployment first before or can you just run the following command. I always deleted it beforehand so can you test this.

  * `kubectl apply -f deployment.yaml`
----
# 4. Running the application

1. Open a browser and enter the following URI:   

  * `http://<cluster-public-id>/<vue-frontend-dns-port-number>`
    * e.g. `http://159.122.175.35:30234`

----

# 5. View inside the containers deployed on the IBM Cloud
If you are having any issues and want to view inside the container, you can use the following commands to view the files.

1. You can run the following interactive command to view inside the container
    * `kubectl get pods`
    * `kubectl exec -it <pod-id> bash`
    * Example: `kubectl exec -it vue-frontend-5c47cbd554-8gwtc /bin/bash`

2. To update any files, you can download vim using the following commands:

    * `apt-get update`
    * `apt-get install vim`
    * Enter `y`
----

# 6. Clean up
When you are finished using the application, it is always good to remove the applications which are no longer being used.

1. Remove the deployments on the Cluster
  * `kubectl delete -f deployment.yaml`
  * `kubectl get pods`  

2. Remove the images from IBM Cloud registry
  * `ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/node-backend:1`
  * `ibmcloud cr image-rm registry.eu-de.bluemix.net/aweda/vue-frontend:1`
  * `ibmcloud cr image-list`

3. Remove the namespace

  * `kubectl get namespaces`
  * `kubectl delete namespaces dev`

4. Remove the cluster

  * TODO - get command

3. Remove the images not being used on your local machine
  * `docker system prune -a`
  * `y` - to delete everything
  * `docker image ls`
