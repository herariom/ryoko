#!/bin/bash

# `sudo aws configure` must be run before this script is run

echo "Enter the frontend ECR repository URI: "
read repo_uri # URI should be in the form of ########.dkr.ecr.us-east-1.amazonaws.com/repo_name, or similar depending on your region

cd ryoko-ui/

sudo aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin $repo_uri
sudo docker build -t ryoko-ui .
sudo docker tag my-first-ecr-repo:latest $repo_uri:latest
sudo docker push $repo_uri:latest

echo "Enter the backend ECR repository URI: "
read repo_uri # URI should be in the form of ########.dkr.ecr.us-east-1.amazonaws.com/repo_name, or similar depending on your region

cd ../ryoko-backend/

sudo docker build -t ryoko-backend .
sudo docker tag ryoko-backend:latest $repo_uri:latest
sudo docker push $repo_uri:latest
