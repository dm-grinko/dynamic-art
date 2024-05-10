variable "region" {
  description = "AWS region"
  type        = string
}

variable "access_key" {
  description = "AWS access key"
  type        = string
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
}

variable "client_url" {
  description = "client url"
  type        = string
}

variable "server_url" {
  description = "server url"
  type        = string
}

variable "collection_id" {
  description = "collection id"
  type        = string
}

variable "dynamodb_user_table" {
  description = "dynamodb table"
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
  description = "s3 bucket"
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

variable "certificate_arn" {
  description = "certificate arn"
  type        = string
}
