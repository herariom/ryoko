FROM python:3.10.7-slim-bullseye

WORKDIR /app

COPY ./requirements.txt ./

RUN env && pip install --no-cache-dir -r requirements.txt

COPY . ./

EXPOSE 5000

CMD [ "python", "run.py" ]