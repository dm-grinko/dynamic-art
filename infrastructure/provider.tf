terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.45"
    }
  }

  # aws s3api create-bucket --bucket dynamic-art-tfstate --region us-east-1
  backend "s3" {
    bucket = "dynamic-art-tfstate" // your bucket
    key    = "state.tfstate" // your terraform state file name
    region = "us-east-1" // your aws region
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key
}