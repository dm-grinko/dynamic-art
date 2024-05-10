resource "aws_cloudwatch_log_group" "ecs" {
    name              = "/ecs/dynamic-art"
    retention_in_days = 1
}
