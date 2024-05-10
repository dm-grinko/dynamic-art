# Dynamic Art

A dynamic art app that allows administrators to organize photo albums and categorize photos, assigning categories to specific users. Users can access their designated images through a personalized display that utilizes facial recognition technology for a seamless, hands-free experience.

## Features

- **Admin Dashboard**: Create, organize, and manage photo albums and categories.
- **User Management**: Add, manage, and assign photo categories to users.
- **Facial Recognition**: Users can access personalized photo galleries by scanning their faces using a camera.
- **WebSocket Integration**: Real-time communication between the frontend and backend for a seamless user experience.
- **Dynamic Display**: Users' personalized galleries can be displayed on devices like digital photo frames.

## Tech Stack

- **Frontend**: NextJS, TypeScript, React, Redux, axios, Bootstrap, socket.io-client, ESLint.
- **Backend**: NestJS, TypeScript, NodeJS, socket.io, aws-sdk v3, RxJS, nodemon.
- **Cloud Resources**: ECS Fargate, DynamoDB, S3, Amazon Rekognition, Cloud Watch, ECR, VPC, Subnets, Internet Gateway, Elastic IP, NAT Gateway, Route Table, Application Load Balancer, IAM, Security Groups, Route 53, ACM.
- **DevOps**: Terraform, Docker, Git, GitHub Actions.
- **Testing**: Jest.

## AWS Architecture diagram
![alt text](https://raw.githubusercontent.com/dm-grinko/dynamic-art/main/readme.png "aws")

## Getting Started

Follow these steps to set up the project and infrastructure:

1. **Create `variables.tfvars` file**: Create a `variables.tfvars` file using `variables.tfvars.example` as a template.

2. **Create S3 Bucket**: Create a new S3 bucket for storing Terraform state:
    ```bash
    aws s3api create-bucket --bucket <your-bucket-name> --region <your-aws-region>
    ```

3. **Update Backend Data**: Update the backend data in the `provider.tf` file to reference the S3 bucket.

4. **Initialize Terraform**: Initialize Terraform to set up the working directory and download plugins:
    ```bash
    terraform init
    ```

5. **Plan Infrastructure**: Generate an execution plan with Terraform using `variables.tfvars`:
    ```bash
    terraform plan -var-file=variables.tfvars
    ```

6. **Apply Changes**: Apply the planned changes to provision the infrastructure:
    ```bash
    terraform apply -var-file=variables.tfvars -auto-approve
    ```

7. **List Terraform State**: To see a list of the resources managed by Terraform, use:
    ```bash
    terraform state list
    ```

8. **Destroy Infrastructure**: Remove the infrastructure with:
    ```bash
    terraform destroy -var-file=variables.tfvars -auto-approve
    ```
