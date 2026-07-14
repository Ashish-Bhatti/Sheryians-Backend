# AWS :- cloud platform which rents servers, pay on you go
# VPC :- Virtual Private Cloude - it is created inside AWS and it is isolated
# Security Group :- we set firewall rule like in which port we are allowing traffic
# Target Group :- a list of resourses where ALB can send the traffic like servers and containers
# ALB :- Apllication load balancer - it distributes traffic to your multiple servers or containers.
# CloudWatch :- log and monitoring for your app
# ECR :- Storage Area for Docker IMAGE. It can also store version of IMAGES.(for storing the images )
# ECS :- It is the actual one who runs the server. (for running images)
# ECS have 2 part
1. Task Defination :- we have multiple images in ECR and task defination tells which image we will run and how much resources it will take(vCPU and RAM)
2. Services :- it will run the image after reading the task defination
# Task Role (ECS) :- A task role provides permissions to containers running inside an ECS task
# Task Execution Role (ECS) :- A task Execution Role is used by ECS to perform operatons like pulling images or sending logs
# IAM :- we will create new credential to give a user a limited access like root user can do anything on aws but we want a user to use just 2 services ECR and ECS and that's why we use IAM


=> Now steps to push and IMAGE to AWS
# create IAM
1. Security, Identity, & Compliance -> IAM -> IAM User -> create user -> name -> attach policy directly -> search container -> select AmazonEC2ContainerRegistryFul -> search ECS -> select AMAZONECS_FullAccess -> click next -> review and create user ->click on user -> Create access key -> select Command Line Interface (CLI) ->
2. install AWS CLI
3. we will use terminal for this setup we will use wrap
 - check aws version -> aws version
 - config aws -> aws configure -> enter ACCESS_KEY & SECRET_ACCESS_KEY -> enter region from aws console ap-south-1 (Mumbai) -> output format - json
 ```
aws --version
aws-cli/2.35.22 Python/3.14.6 Windows/11 exe/AMD64
aws configure

Tip: You can deliver temporary credentials to the AWS CLI using your AWS Console session by running the command 'aws login'.

AWS Access Key ID [None]: abc
AWS Secret Access Key [None]: abc
Default region name [None]: ap-south-1
Default output format [None]: json
```
now local setup is ready to do the work

# create ECR
4. back to all services page and select
    Containers -> Elastic Container Registry -> Create a repository -> name - cohort-demo -> click create
5. we will use gitbash terminal for this step - we will use MacOs command in gitbash
    select created ECR -> click Push commands for cohort-demo
6. commands - copy DOCKER_COMOSE folder path in GITBASH - shift + fn + insert
{
Retrieve an authentication token and authenticate your Docker client to your registry. Use the AWS CLI:
1. aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 567768660766.dkr.ecr.ap-south-1.amazonaws.com
Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.
Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here . You can skip this step if your image is already built:
2. docker build -t cohort-demo .
replace this command with
2. docker buildx build --platform linux/amd64 -t cohort-demo:latest . --load
--load :- without it image will be created but it will not save
    we need to match the our local machine (pc) architeture with AWS EC2
    it will help to create cross architeture IMAGES
After the build completes, tag your image so you can push the image to this repository:
3. docker tag cohort-demo:latest 567768660766.dkr.ecr.ap-south-1.amazonaws.com/cohort-demo:latest
Run the following command to push this image to your newly created AWS repository:
4. docker push 567768660766.dkr.ecr.ap-south-1.amazonaws.com/cohort-demo:latest
}

7. done we successfully pushed the IMAGE into ECR with those 4 commands

# NOW CREATE A VPC
8. Networking & Content Delivery -> VPC -> create VPC -> select VPC and more -> don't change anything expect name - click create VPC

- VPC more - it will automatically create VPC , SUBNET and Internet Gateway

# NOW ECS - Elastic Container Service
9. Container -> Elastic Container Service
Clusters -> create cluster -> name(cohort cluster) -> select Fargate only - in Infrastrucue-advanced -> create
-> task definitions -> create new task definition -> name - cohort_task -> we can change CPU but for now let's use default -> task role

# to set task role in previous step go back to all service page
10. IAM -> Roles -> create Role -> AWS service -> Use case - Elastic Container Service -> select - Task Execution Role for Elastic Container Service -> Next -> Next -> Role name - cohort-task-role - create role

# now we will continue step 9
task role -> select for both task role & task execution role - cohort-task-role -> Container details -> name -> cohort-demo-server -> In Img url -> click  - Browse ECR iamges -> choose a repository -> cohort-demo -> select -latest -> select - Img tag -> select Image
Container port -> write the port number in which server is gonna run - 3000 , port name - express-server -> add Environment vairable if any -> create

11. Back to clusters
Clusters -> click - cohort (previous created cluster) -> in service click - create -> select task definition - cohort-task -> in Deployment config - desired tasks select - 2 -> Networking - select vpc - cohort-vpc-vpc -> Subnets - remove private subnets ->
Load balancing -> select - use load balancing -> load balancer name - cohort-ALB -> Target group - cohort-tg -> we can select Service auto scaling - optional -> create service

- we can check security group by going into EC2 -> secuity group -it will tell which traffic we are allowing currently we are going with default one

# After service created - we need to congif network to see the server
12. open service -> congfigure and networking -> network config - click - security groups -> edit inbound rule -> add rule -> type - all tcp, source - anywhere or for custom tcp you can allow port number 3000

# to access the service
13. open service -> congfigure and networking -> network config -> DNS - copy it
OR
EC2 -> Load Balancers -> cohort-ALB -> DNS name