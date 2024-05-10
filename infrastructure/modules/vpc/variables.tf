variable "env" {
  description = "Environment name"
  type        = string
}

variable "vpc_cidr_block" {
  description = "CIDR (Classless Inter-Domain Routing)"
  type        = string
}

variable "azs" {
  description = "Availability zones for subnets"
  type        = list(string)
}

variable "private_subnets" {
  description = "CIDR ranges for private subnets"
  type        = list(string)
}

variable "public_subnets" {
  description = "CIDR ranges for public subnets"
  type        = list(string)
}

variable "security_group_ids" {
  description = "security_group_ids"
  type        = list(string)
}

variable "region" {
  description = "AWS region"
  type        = string
}

variable "aws_vpc_endpoint_s3_ecr_access" {
  description = "aws_vpc_endpoint_s3_ecr_access"
  type        = string
}

variable "ecr_endpoint_security_group_ids" {
  description = "security group ids for ecr vpc endpoint"
  type        = list(string)
}