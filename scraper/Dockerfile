FROM python:3.7-alpine
WORKDIR /scraper
COPY requirements.txt requirements.txt
RUN apk add build-base
RUN apk add libffi-dev
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]