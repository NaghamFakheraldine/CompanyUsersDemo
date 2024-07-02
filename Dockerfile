FROM python:3.12 

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV AWS_REGION=us-east-1

EXPOSE 5000

CMD ["python", "app.py"]
