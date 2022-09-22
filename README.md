# BOSS-RAID PVE 컨텐츠 API 서비스
09.16~09.22 `Nest.js` `BACKEND`

## 구현 개요
보스레이드 PVE 컨텐츠 관련 라우터 작성
* 유저 생성
  * 게임을 진행하는 사용자 생성
* 유저 조회
  * 사용자의 total score 조회
  * 사용자의 게임 history 조회
* 보스레이드 시작
  * 사용자가 보스레이드에 참가
  * 보스레이드 레벨 선택
  * 타 사용자가 보스레이드를 진행 중이라면 시작할 수 없음
* 보스레이드 상태 조회
  * 보스레이드가 진행중이라면 해당 사용자 아이디 응답
* 보스레이드 종료
  * 제공된 외부 데이터를 통해 레벨에 맞는 점수 제공
  * 진행 시간이 초과되면 점수를 받을 수 없음
* 랭킹 조회
  * 모든 사용자의 total score 를 랭킹으로 정렬해서 응답
  * 선택한 사용자의 랭크 정보를 응답

## 사용기술
`Nest.js` `mySQL` `TypeORM` `TypeScript` `redis` `AWS` `elastiCache`
## 폴더구조
```bash
src
├── config 
│   └── typeorm.config.ts        # typeorm 관련 기본 설정
├── cache
│   ├── redis.module.ts          # redis 사용 모듈
│   └── redis.service.ts         # redis cache 사용 서비스 정의
├── users   
│   ├── dto
│   │   └── create-user.dto.ts
│   ├── entities            
│   │   └── user.entity.ts       # user Table 정의
│   ├── users.controller.ts      # user 라우팅 (http method 포함) 
│   ├── users.module.ts          
│   └── users.service.ts         # user 서비스 정의
├── raid-records
│   ├── dto
│   │   ├── boss-raid-start.dto.ts
│   │   └── boss-raid-end.dto.ts
│   ├── entities
│   │   └── raid-records.entity.ts    # raid-records Table 정의
│   ├── raid-records.controller.ts    # raid-records 라우팅 (http method 포함)
│   ├── raid-records.module.ts
│   └── raid-records.service.ts       # raid-records 서비스 정의
...
├── app.module.ts
└── main.ts                       # 서버 실행
``` 
## DB 구조
![image](https://user-images.githubusercontent.com/50348197/191812076-bba11a3a-d8d4-4756-acd2-eb106d8a4c2b.png)

## API 명세
[POSTMAN DOCUMENTATION](https://documenter.getpostman.com/view/19606295/2s7ZE8o3KM)

### 🚀 사용자 생성
  
![image](https://user-images.githubusercontent.com/50348197/191807962-ed8dace5-13bc-4cdd-9f6b-3afa213c2173.png)
> 게임을 진행할 사용자를 등록합니다.
  
### 🚀 사용자 정보 조회
  
![image](https://user-images.githubusercontent.com/50348197/191809539-33c48c63-4219-43b1-9769-a9597a8bb5d7.png)
> 시간초과로 0점 + 레벨 2 클리어 ==> totalScore 85점

### 🚀 레이드 입장
  
![image](https://user-images.githubusercontent.com/50348197/191808055-f505f9bb-9f65-4f37-b0b9-807671f6f2ca.png)
> 레이드에 입장합니다.

![image](https://user-images.githubusercontent.com/50348197/191808542-13ea1475-ab94-453d-95e1-879fab6ad61d.png)
> 레이드가 진행중이라면 입장이 불가합니다.
  
### 🚀 레이드 상태 조회
  
![image](https://user-images.githubusercontent.com/50348197/191808621-cd18a2b1-51d3-445d-b526-13ad017f77ae.png)
> 레이드가 진행중이라 진행중인 사용자 이름을 보여줍니다.
  
![image](https://user-images.githubusercontent.com/50348197/191809006-2c7551af-44bc-4684-af26-bcf11444662b.png)
> 진행중인 레이드가 없습니다. 사용자를 기다립니다.
  
### 🚀 레이드 종료
  
![image](https://user-images.githubusercontent.com/50348197/191808875-9992edd6-5007-4fb8-bf6f-5bb246ae4986.png)
> 레이드를 종료하였습니다. 이때 DB에 종료된 시간과 점수를 등록합니다.
  
![image](https://user-images.githubusercontent.com/50348197/191808951-94be01dc-bca0-4a44-8580-960a3986b4a3.png)
> 이미 레이드를 종료하였기 때문에 종료할 게임이 남아있지 않습니다.
  
![image](https://user-images.githubusercontent.com/50348197/191810915-3e9ec976-cf51-455f-8741-22e87cef47d2.png)
> 게임을 정해진 진행시간 이상으로 지속하였습니다. 보스레이드를 깨지 못했습니다. 점수를 얻지 못합니다.
  
### 🚀 레이드 랭킹 조회
  
![image](https://user-images.githubusercontent.com/50348197/191810002-f231203a-275b-40e1-8243-9d57a413e665.png)
> 0이 가장 높은 랭킹이고, 사용자의 등수가 함께 보여집니다.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## 후기
1. Nest와 ts의 첫 사용에 큰 의미를 두고 있습니다.
2. typeORM 을 사용하여 트랜잭션할 수 있습니다.
3. Redis cache를 사용할 수 있습니다. (도움 : [jason](https://github.com/jimyungkoh) thx..🙂🙏)
 


## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
