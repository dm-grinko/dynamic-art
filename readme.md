# Dynamic Art


### AWS Architecture diagram 
![alt text](https://raw.githubusercontent.com/dm-grinko/dynamic-art/main/readme.png "aws")


### Usage

- Create `variables.tfvars` file using `variables.tfvars.example`
- Create a new S3 bucket for terraform state:
`aws s3api create-bucket --bucket <your-backet-name> --region <your-aws-region>`
- Update backend data in `provider.tf` file
- `terraform init`
- `terraform plan -var-file=variables.tfvars`
- `terraform apply -var-file=variables.tfvars -auto-approve`
- `terraform state list`
- `terraform destroy -var-file=variables.tfvars -auto-approve`
