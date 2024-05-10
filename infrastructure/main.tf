module "vpc" {
  source = "./modules/vpc"
  env = "prod"
  region = var.region
  vpc_cidr_block  = "10.0.0.0/16"
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.12.0/24", "10.0.22.0/24"]
  public_subnets  = ["10.0.11.0/24", "10.0.21.0/24"]
  ecr_endpoint_security_group_ids = [aws_security_group.ecs.id]
  aws_vpc_endpoint_s3_ecr_access = data.aws_iam_policy_document.s3_ecr_access.json
  security_group_ids = [aws_security_group.ecs.id]
}

# module "alb" {
#   source = "./modules/alb"
#   name = "alb"
#   depends_on = [ module.vpc ]
#   vpc_id = module.vpc.id
#   subnets = module.vpc.public_subnet_ids
#   security_groups = [aws_security_group.alb.id]
#   frontend_port = 80
#   backend_port = 3002
#   frontend_container_port = 3000
#   backend_container_port = 3002
#   certificate_arn = var.certificate_arn
# }

# module "ecs" {
#   source = "./modules/ecs"
#   cluster_name = "cluster"
#   region = var.region
#   depends_on = [ module.alb ]
#   frontend_ecr_repository_url = aws_ecr_repository.frontend.repository_url
#   backend_ecr_repository_url = aws_ecr_repository.backend.repository_url
#   frontend_container_port = 3000
#   backend_container_port = 3002
#   execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
#   task_role_arn = aws_iam_role.ecs_task_role.arn
#   subnets = module.vpc.private_subnet_ids
#   security_groups = [aws_security_group.ecs.id, aws_security_group.alb.id]
#   backend_target_group_arn = module.alb.backend_target_group_arn
#   frontend_target_group_arn = module.alb.frontend_target_group_arn
#   logs_group = aws_cloudwatch_log_group.ecs.name
#   client_url = var.client_url
#   server_url = var.server_url
#   access_key = var.access_key
#   secret_key = var.secret_key
#   collection_id = var.collection_id
#   dynamodb_user_table = var.dynamodb_user_table
#   dynamodb_category_table = var.dynamodb_category_table
#   dynamodb_picture_table = var.dynamodb_picture_table
#   s3_user_bucket = var.s3_user_bucket
#   s3_picture_bucket = var.s3_picture_bucket
#   frontend_ecr_version = var.frontend_ecr_version
#   backend_ecr_version = var.backend_ecr_version
#   frontend_desired_count = var.frontend_desired_count
#   backend_desired_count = var.backend_desired_count
# }
