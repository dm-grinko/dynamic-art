all: apply
# all: state

init:
	@echo "Initializing Terraform..."
	terraform init --upgrade

plan:
	@echo "Creating Terraform plan..."
	terraform plan -var-file=variables.tfvars

state:
	@echo "Terraform state resources:"
	terraform state list

apply:
	@echo "Applying Terraform plan..."
	terraform apply -var-file=variables.tfvars -auto-approve

destroy:
	@echo "Destroying Terraform resources..."
	terraform destroy -var-file=variables.tfvars -auto-approve

.PHONY: all init plan apply destroy
