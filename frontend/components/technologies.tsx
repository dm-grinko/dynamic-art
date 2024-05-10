
export default function Technologies() {

    const features = [
      {
        category: "Frontend",
        items: [
          { name: "NextJS" },
          { name: "TypeScript" },
          { name: "React" },
          { name: "Redux" },
          { name: "axios" },
          { name: "bootstrap" },
          { name: "socket.io-client" },
          { name: "eslint" },
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "NestJS" },
          { name: "TypeScript" },
          { name: "NodeJS" },
          { name: "socket.io" },
          { name: "aws-sdk v3" },
          { name: "RxJS" },
          { name: "nodemon" },
        ]
      },
      {
        category: "Cloud Resources",
        items: [
          { name: "ECS Fargate"},
          { name: "Dynamodb"},
          { name: "S3"},
          { name: "Amazon Rekognition"},
          { name: "Cloud Watch"},
          { name: "ECR" },
          { name: "VPC"},
          { name: "Subnets"},
          { name: "Internet gateway"},
          { name: "Elastic ip"},
          { name: "NAT gateway"},
          { name: "Route table"},
          { name: "Application load balancer"},
          { name: "IAM"},
          { name: "Security groups"},
          { name: "Route 53"},
          { name: "ACM"},
        ]
      },
      {
        category: "DevOps",
        items: [
          { name: "Terraform" },
          { name: "Docker" },
          { name: "Git" },
          { name: "Github actions" }
        ]
      },
      {
        category: "Testing",
        items: [
          { name: "Jest" },
        ]
      },
      
    ]
  
  
    return (
  
      <div className="features">
        {features.map((category, categoryKey) => {
          return <div key={categoryKey}>
            <h3>{category.category}</h3>
            {/* <ul className="list-group list-group-flush"> */}
            {category.items.map((technology, technologyKey) => {
              // return <li className="list-group-item">{i.name}</li>
              return <span key={technologyKey} className="technology">{technology.name}</span>
            })}
            {/* </ul> */}
            <br />
            <br />
          </div>
        })}
  
      </div>
    );
  }
  