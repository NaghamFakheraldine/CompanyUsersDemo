from flask import Flask, render_template, request, jsonify
import boto3, os
from flask_cors import CORS

app = Flask(__name__)

CORS(app) 

# Initialize AWS clients with region specified
region = os.getenv('AWS_REGION', 'us-east-1')

ssm = boto3.client('ssm', region_name=region)
dynamodb = boto3.resource('dynamodb', region_name=region)

# Function to fetch parameter from Parameter Store
def get_parameter_from_ssm(parameter_name):
    response = ssm.get_parameter(Name=parameter_name, WithDecryption=False)
    return response['Parameter']['Value']

# Fetch DynamoDB table name from Parameter Store
table_name_param = 'table-name'
table_name = get_parameter_from_ssm(table_name_param)

# Initialize DynamoDB table
table = dynamodb.Table(table_name)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/users.html")
def users_page():
    return render_template('users.html')

@app.route('/users', methods=['GET'])
def fetch_users():
    company_domain = request.args.get('company_domain')

    if not company_domain:
        return 'No company domain provided', 400

    return render_template('users.html', company_domain=company_domain)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port = 5000, debug=True)
