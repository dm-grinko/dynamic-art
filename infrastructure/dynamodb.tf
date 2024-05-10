resource "aws_dynamodb_table" "users" {
  name           = var.dynamodb_user_table
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "RekognitionID"

  attribute {
    name = "RekognitionID"
    type = "S"
  }
}

resource "aws_dynamodb_table" "categories" {
  name           = var.dynamodb_category_table
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "adminId"
  range_key      = "categoryId"

  attribute {
    name = "adminId"
    type = "S"
  }

  attribute {
    name = "categoryId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "pictures" {
  name           = var.dynamodb_picture_table
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "categoryId"
  range_key      = "pictureId"

  attribute {
    name = "pictureId"
    type = "S"
  }

  attribute {
    name = "categoryId"
    type = "S"
  }
}
