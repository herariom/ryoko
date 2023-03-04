provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.12.0"
}

resource "aws_vpc" "ryoko-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true
}

resource "aws_subnet" "subnet-a" {
  cidr_block = "${cidrsubnet(aws_vpc.ryoko-vpc.cidr_block, 3, 1)}"
  vpc_id = "${aws_vpc.ryoko-vpc.id}"
  availability_zone = "us-east-1a"
}

resource "aws_security_group" "security-group" {
  name = "ryoko-security-group"
  vpc_id = "${aws_vpc.ryoko-vpc.id}"
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
   from_port = 0
   to_port = 0
   protocol = "-1"
   cidr_blocks = ["0.0.0.0/0"]
 }
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_iam_role" "ec2_role_ryoko" {
  name = "ec2_role_ryoko"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  tags = {
    project = "hello-world"
  }
}

resource "aws_iam_instance_profile" "ec2_profile_ryoko" {
  name = "ec2_profile_ryoko"
  role = aws_iam_role.ec2_role_ryoko.name
}

resource "aws_iam_role_policy" "ec2_policy" {
  name = "ec2_policy"
  role = aws_iam_role.ec2_role_ryoko.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.micro"
  key_name      = "ryoko"

  root_block_device {
    volume_size = 8
  }

  user_data = <<-EOF
              #!/bin/bash
              set -ex
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo yum install git -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              sudo curl -L https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/sbin/docker-compose
              sudo chmod +x /usr/sbin/docker-compose
              git clone https://github.com/herariom/ryoko
              cd ryoko
              mv .env.template .env
              sudo docker-compose up -d
  EOF

  vpc_security_group_ids = ["${aws_security_group.security-group.id}"]
  iam_instance_profile = aws_iam_instance_profile.ec2_profile_ryoko.name

  subnet_id = "${aws_subnet.subnet-a.id}"

  monitoring              = true
  disable_api_termination = false
  ebs_optimized           = true
}

resource "aws_eip" "web-ip" {
  instance = "${aws_instance.web.id}"
  vpc      = true
}

resource "aws_internet_gateway" "ryoko-igw" {
  vpc_id = "${aws_vpc.ryoko-vpc.id}"
}

resource "aws_route_table" "route-table" {
  vpc_id = "${aws_vpc.ryoko-vpc.id}"
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.ryoko-igw.id}"
  }
}

resource "aws_route_table_association" "subnet-association" {
  subnet_id      = "${aws_subnet.subnet-a.id}"
  route_table_id = "${aws_route_table.route-table.id}"
}