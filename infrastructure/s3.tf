# ****** USER BUCKET ******
resource "aws_s3_bucket" "user" {
  bucket = var.s3_user_bucket
}

resource "aws_s3_bucket_public_access_block" "user_bucket_public_access_block" {
  bucket = aws_s3_bucket.user.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "user_bucket_policy" {
  depends_on = [
    aws_s3_bucket.user
  ]
  bucket = aws_s3_bucket.user.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.user.arn}",
          "${aws_s3_bucket.user.arn}/*",
          "${aws_s3_bucket.user.arn}/*/*"
        ]
      }
    ]
  })
}

# ****** PICTURE BUCKET ******
resource "aws_s3_bucket" "picture" {
  bucket = var.s3_picture_bucket
}

resource "aws_s3_bucket_public_access_block" "picture_bucket_public_access_block" {
  bucket = aws_s3_bucket.picture.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "picture_bucket_policy" {
  depends_on = [
    aws_s3_bucket.picture
  ]
  bucket = aws_s3_bucket.picture.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.picture.arn}",
          "${aws_s3_bucket.picture.arn}/*",
          "${aws_s3_bucket.picture.arn}/*/*"
        ]
      }
    ]
  })
}