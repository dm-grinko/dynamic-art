resource "aws_ecr_repository" "frontend" {
  name                 = "dynamic-art-frontend"
  image_tag_mutability = "MUTABLE"
}

data "aws_iam_policy_document" "frontend" {
  statement {
    sid    = "Frontend ECR policy"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.ecs_task_execution_role.arn]
    }

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeRepositories",
      "ecr:GetRepositoryPolicy",
      "ecr:ListImages",
      "ecr:DeleteRepository",
      "ecr:BatchDeleteImage",
      "ecr:SetRepositoryPolicy",
      "ecr:DeleteRepositoryPolicy",
    ]
  }
}

resource "aws_ecr_repository_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name
  policy     = data.aws_iam_policy_document.frontend.json
}

resource "aws_ecr_repository" "backend" {
  name                 = "dynamic-art-backend"
  image_tag_mutability = "MUTABLE"
}

data "aws_iam_policy_document" "backend" {
  statement {
    sid    = "backend ECR policy"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = [aws_iam_role.ecs_task_execution_role.arn]
    }

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeRepositories",
      "ecr:GetRepositoryPolicy",
      "ecr:ListImages",
      "ecr:DeleteRepository",
      "ecr:BatchDeleteImage",
      "ecr:SetRepositoryPolicy",
      "ecr:DeleteRepositoryPolicy",
    ]
  }
}

resource "aws_ecr_repository_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy     = data.aws_iam_policy_document.backend.json
}