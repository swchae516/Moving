# **ssafy 6기 2학기 특화PJT(22/02/21 ~ 22/04/8)**

## 프로젝트 주제

사용자 평점 기반 빅데이터 영화 추천 서비스

![moving_main](https://user-images.githubusercontent.com/68841702/170449675-e944dc91-22d1-45db-8119-66bf5fdb80c1.png)

![image](https://user-images.githubusercontent.com/68841702/170447435-a1b3cdf0-eb09-4681-b94a-d6c6859d7933.png)

## 기획

![image](https://user-images.githubusercontent.com/68841702/170447574-fbc4ed70-b538-4c7e-85f2-bd5bdf1c36eb.png)

### 기술스택

### Front-End

![image](https://user-images.githubusercontent.com/68841702/170447887-d8f44bb4-6ec3-44c0-af15-2fce97c0061a.png)

- Next.JS 를 활용하여 SSR(Server Side Rendering) 페이지 구현

  

### Back-End

![image](https://user-images.githubusercontent.com/68841702/170447932-127111da-4300-4fec-afcd-ac83b159960c.png)

- Django 를 활용한 백엔드 구축
- 빅데이터 기반 추천 알고리즘
  - MF(Matrix Factorization) 을 활용한 협업 필터링
    - 사용자-영화 사이의 평점 데이터를 대규모 다차원 행렬로 만들어 SVD 차원 감소 기법으로 분해하는 과정에서 잠재요인을 찾아내어 뽑아낸 후에 이를 토대로 추천해주는 알고리즘
  - Cosine Similarity 를 활용한 장르 기반 추천알고리즘
    - 영화가 가진 장르들을 토대로 영화들 간의 장르 유사도를 비교하여 비슷한 장르들을 추천 



### E-R Diagram

![image](https://user-images.githubusercontent.com/68841702/170448829-3f92ef6a-d540-4a4d-8e81-8942e9d9a431.png)


## 개발 결과
<ul>
  <li>메인페이지</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173016292-f2bda07d-ddbe-46f5-b909-3c6a102eb439.png" />
  </P>
  <li>메인페이지 - 추천</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173016479-195e573e-65ae-4381-90e0-6a5d7ffc1d8e.png" />
  </P>
  <li>로그인/회원가입</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173016667-21391854-ce45-40ca-b388-ab5f1023d6fc.png" />
  </P>
  <li>프로필 페이지</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173018032-78e4c7e0-89f2-4a07-9fdd-ab26048d7939.png" />
  </P>
  <li>영화 상세 페이지</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173018256-98f2b534-c61a-473a-88d1-b056a515e50d.png" />
  </P>
  <li>영화 스크랩 페이지</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173017108-368ebbf9-eec8-451e-ac8e-19d31cc48b3d.png" />
  </P>
   <li>영화 리뷰 커뮤니티</li>
  <p align="center">
    <img width="600px", src="https://user-images.githubusercontent.com/45279249/173017856-8fa472d3-5b4a-49d2-8940-b6d5961e8db3.png" />"
  </P>
</ul>


## 빌드 및 배포

### 프론트엔드

front 빌드 및 배포 순서

1. npm run build
2. sudo npx pm2 start npm -- start (무중단 배포)
3. sudo npx pm2 kill (중단)



### 백엔드

1. 사용한 JVM, 웹서버

   - python 3.7.9 version , Django 3.2.3 version
   - 웹서버 : Amazon EC2

2. WAS 제품 등의 종류와 설정값

   - uWSGI

     ```ini
     // server.ini
     
     [uwsgi]
     chdir = /home/ubuntu/S06P22C206/back/
     module = server.wsgi:application
     home = /home/ubuntu/S06P22C206/back/venv/
     
     uid = ubuntu
     gid = ubuntu
     
     socket = /tmp/server.sock
     chmod-socket = 666
     chown-socket = ubuntu:ubuntu
     
     enable-threads = true
     master = true
     vacuum = true
     pidfile = /tmp/project_name.pid
     logto = /var/log/uwsgi/server/@(exec://date +%%Y-%%m-%%d).log
     log-reopen = true
     ```

     ```plaintext
     // uwsgi.service
     
     [Unit]
     Description=uWSGI service
     After=syslog.target
     
     [Service]
     ExecStart=/home/ubuntu/S06P22C206/back/venv/bin/uwsgi -i /home/ubuntu/S06P22C206/back/.config/uwsgi/server.ini
     
     Restart=always
     KillSignal=SIGQUIT
     Type=notify
     StandardError=syslog
     NotifyAccess=all
     
     [Install]
     WantedBy=multi-user.target
     ```

   - Nginx

     ```conf
     // server.conf
     
     server {
         listen 8000;
         server_name *.compute.amazonaws.com;
         charset utf-8;
         client_max_body_size 128M;
     
         location / {
             uwsgi_pass  unix:///tmp/server.sock;
             include     uwsgi_params;
         }
     
         location /static/ {
             alias /home/ubuntu/S06P22C206/back/static/;
         }
     }
     ```

1. 배포 시 특이사항 기재

   - 코드가 수정되어 변동사항이 생길 때 다음과 같이 입력해주면 적용됩니다.

   ```shell
   $ sudo systemctl daemon-reload
   $ sudo systemctl restart uwsgi nginx
   ```
