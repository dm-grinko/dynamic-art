variable "cluster_name" {
  description = "ecs cluster name"
  type        = string
}

variable "frontend_ecr_repository_url" {
  description = "frontend ecr repository url"
  type        = string
}

variable "backend_ecr_repository_url" {
  description = "frontend ecr repository url"
  type        = string
}

variable "frontend_container_port" {
  description = "container port"
  type        = number
}

variable "backend_container_port" {
  description = "container port"
  type        = number
}

variable "execution_role_arn" {
  description = "execution_role_arn for aws_ecs_task_definition"
  type        = string
}

variable "task_role_arn" {
  description = "task_role_arn for aws_ecs_task_definition"
  type        = string
}

variable "subnets" {
  description = "subnets for ecs service"
  type        = list(string)
}

variable "security_groups" {
  description = "security_groups for ecs service"
  type        = list(string)
}


variable "backend_target_group_arn" {
  description = "alb target group arn of backend for ecs service"
  type        = string
}

variable "frontend_target_group_arn" {
  description = "alb target group arn of frontend for ecs service"
  type        = string
}

variable "logs_group" {
  description = "cloud watch logs group for ecs task definition"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

variable "client_url" {
  description = "client url"
  type        = string
}

variable "server_url" {
  description = "serverurl"
  type        = string
}

variable "access_key" {
  description = "aws access key id"
  type        = string
}

variable "secret_key" {
  description = "aws secret access key"
  type        = string
}

variable "collection_id" {
  description = "collection id"
  type        = string
}

variable "dynamodb_user_table" {
  description = "dynamodb table for users"
  type        = string
}

variable "dynamodb_picture_table" {
  description = "dynamodb table for pictures"
  type        = string
}

variable "dynamodb_category_table" {
  description = "dynamodb table for categories"
  type        = string
}

variable "s3_user_bucket" {
  description = "s3 bucket fro users"
  type        = string
}

variable "s3_picture_bucket" {
  description = "s3 bucket for pictures"
  type        = string
}

variable "frontend_ecr_version" {
  description = "frontend ecr version"
  type        = string
}

variable "backend_ecr_version" {
  description = "backend ecr version"
  type        = string
}

variable "frontend_desired_count" {
  description = "frontend desired count"
  type        = number
}

variable "backend_desired_count" {
  description = "backend desired count"
  type        = number
}