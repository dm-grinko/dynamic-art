output "id" {
  value = aws_alb.this.id
}

output "dns_name" {
  value = aws_alb.this.dns_name
}

output "zone_id" {
  value = aws_alb.this.zone_id
}

output "backend_target_group_arn" {
  value = aws_lb_target_group.backend.arn
}

output "frontend_target_group_arn" {
  value = aws_lb_target_group.frontend.arn
}

