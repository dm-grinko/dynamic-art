resource "aws_alb" "this" {
  name                      = var.name
  internal                  = false
  load_balancer_type        = "application"
  subnets                   = var.subnets
  security_groups           = var.security_groups
  idle_timeout    = 90
}
