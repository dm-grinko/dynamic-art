resource "aws_ecs_service" "frontend" {
  name                = "frontend-ecs-service"
  launch_type         = "FARGATE"
  scheduling_strategy = "REPLICA"
  cluster             = aws_ecs_cluster.this.arn
  task_definition     = aws_ecs_task_definition.frontend.arn
  desired_count       = var.frontend_desired_count

  network_configuration {
    subnets          = var.subnets
    assign_public_ip = false
    security_groups  = var.security_groups
  }

  load_balancer {
    container_name   = "frontend-container"
    target_group_arn = var.frontend_target_group_arn
    container_port   = var.frontend_container_port
  }
}

resource "aws_ecs_service" "backend" {
  name                = "backend-ecs-service"
  launch_type         = "FARGATE"
  scheduling_strategy = "REPLICA"
  cluster             = aws_ecs_cluster.this.arn
  task_definition     = aws_ecs_task_definition.backend.arn
  desired_count       = var.backend_desired_count

  network_configuration {
    subnets          = var.subnets
    assign_public_ip = false
    security_groups  = var.security_groups
  }

  load_balancer {
    container_name   = "backend-container"
    target_group_arn = var.backend_target_group_arn
    container_port   = var.backend_container_port
  }
}
