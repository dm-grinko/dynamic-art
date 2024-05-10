variable "name" {
  description = "application load balancer name"
  type        = string
}

variable "subnets" {
  description = "application load balancer subnets"
  type        = list(string)
}

variable "security_groups" {
  description = "application load balancer security groups"
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC id"
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

variable "frontend_port" {
  description = "frontend app port"
  type        = number
}

variable "backend_port" {
  description = "backend app port"
  type        = number
}

variable "certificate_arn" {
  description = "certificate arn"
  type        = string
}