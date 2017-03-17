# bigquery-json-export-service

*Purpose:* export any table to json

## How to use with Kubernetes:
1. clone the repo
2. build docker image with the file provided
3. push the image to gcloud docker registry
4. create a new deployment with kubectl command. Example config file provided

Note to use it as a backend service in the cluster, you need to expose the hosts params to resolve via DNS or environment vars. 
Check docs for more details here:  https://kubernetes.io/docs/user-guide/services/

## Usage
To use the service maps url path to bigquery project, dataset and table name.

Example call to project: ninja-project-1342 dataset: weapons table: knives;
would result in: 

http://localhost:8080/ninja-project-1342/weapons/knives
