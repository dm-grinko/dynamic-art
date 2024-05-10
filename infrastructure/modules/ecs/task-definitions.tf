resource "aws_ecs_task_definition" "frontend" {
  family                   = "frontend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn
  container_definitions = jsonencode(
    [
      {
        "name" : "frontend-container",
        "image" : "${var.frontend_ecr_repository_url}:${var.frontend_ecr_version}",
        "entryPoint" : [],
        "essential" : true,
        "networkMode" : "awsvpc",
        "portMappings" : [
          {
            "containerPort" : var.frontend_container_port,
            "hostPort" : var.frontend_container_port
          }
        ],
        "healthCheck" : {
          "command" : ["CMD-SHELL", "curl -f https://localhost:${var.frontend_container_port}/ || exit 1"],
          "interval" : 5,
          "timeout" : 5,
          "startPeriod" : 10,
          "retries" : 3
        },
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-group" : var.logs_group,
            "awslogs-region" : var.region,
            "awslogs-stream-prefix" : "frontend"
          }
        },
        "environment" : [
          {
            "name" : "SERVER_URL",
            "value" : tostring(var.server_url)
          },
        ],
      }
    ]
  )
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "backend-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn
  container_definitions = jsonencode(
    [
      {
        "name" : "backend-container",
        "image" : "${var.backend_ecr_repository_url}:${var.backend_ecr_version}",
        "entryPoint" : [],
        "essential" : true,
        "networkMode" : "awsvpc",
        "portMappings" : [
          {
            "containerPort" : var.backend_container_port,
            "hostPort" : var.backend_container_port
          }
        ],
        "environment" : [
          {
            "name" : "PORT",
            "value" : tostring(var.backend_container_port)
          },
          {
            "name" : "CLIENT_URL",
            "value" : tostring(var.client_url)
          },
          {
            "name" : "AWS_ACCESS_KEY_ID",
            "value" : tostring(var.access_key)
          },
          {
            "name" : "AWS_SECRET_ACCESS_KEY",
            "value" : tostring(var.secret_key)
          },
          {
            "name" : "AWS_REGION",
            "value" : tostring(var.region)
          },
          {
            "name" : "COLLECTION_ID",
            "value" : tostring(var.collection_id)
          },

          {
            "name" : "DYNAMODB_USER_TABLE",
            "value" : tostring(var.dynamodb_user_table)
          },

          {
            "name" : "S3_USER_BUCKET",
            "value" : tostring(var.s3_user_bucket)
          },

          {
            "name" : "S3_PICTURE_BUCKET",
            "value" : tostring(var.s3_picture_bucket)
          },
          {
            "name" : "DYNAMODB_CATEGORY_TABLE",
            "value" : tostring(var.s3_user_bucket)
          },
          {
            "name" : "DYNAMODB_PICTURES_TABLE",
            "value" : tostring(var.s3_user_bucket)
          },
        ],
        "healthCheck" : {
          "command" : ["CMD-SHELL", "curl -f https://localhost:${var.backend_container_port}/health || exit 1"],
          "interval" : 5,
          "timeout" : 5,
          "startPeriod" : 10,
          "retries" : 3
        },
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-group" : var.logs_group,
            "awslogs-region" : var.region,
            "awslogs-stream-prefix" : "backend"
          }
        }
      }
    ]
  )
}

