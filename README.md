# TabletFrame 22 개정 비상 에듀 테크 초/중고 통합본

# 기존 대비 달라진 사항
1. 추가된 사항 (Native => Kotlin / Java Base)  
   위치 => (app/src/java) (app/src/libs) (app/src/res) (app/root root)  
- 컨텐츠 Download 기능 구현  
- APK 업데이트 기능 구현  
- Permission 기능 구현  
- Download 모듈 코어 구현  
- AOS Native 형 UI Widget Component 구현  
- Build Variants Target 추가 설정 배치  
- Gradle 호환 설정 배치  
- 각 라이브러리 호환성 모듈 배치  
- Proguard Rules 전면 구성 배치 및 작성 (R8)  

  Third Party Library  
- 33 개 추가  (버전간 상호 호환성 체크 완료)
- Download Module Library (vstdn-lib-1.6-release.aar)      
  (다운로드 모듈 프로젝트 별개 생성하여 구현 작성된 쪽에서 추출하여 탑재)  

# 참고 사항
app => src => main => assets  
1. 기존 초등 / 중고등 통합 버전 이다.   

# 유의 사항

1. src => app => assets [웹자원 저장 한계점 4.5 GB]  
   현재의 위치에 웹자원이 탑재될 수 있는 총 한계는 4.5 GB 이다.  
   하지만 4GB 미만 으로 봐야 한다. 그리고 최적 저장 한계는  
   2GB ~ 3GB 정도이다. 해당 위치에 자원이 증강 될 수록 프로젝트  
   전반 빌드 속도에 영향이 갈 수 밖에 없다. 최대한 불필요한 사항은   
   탑재 되지 말아야 한다. 그리고 인계점을 넘어가면 설치가 취소된다.    
   또한 탑재도 불가하다. 반드시 참조할것.

2. src => app => assets [html sample page]   
   해당 경로 에서 테스트 페이지가 필요하다면 sample_subpage  
   안에 추가 페이지를 추가해서 해볼 수 있다.  
   루트 경로에 index_sample.html 위치는 변경 없고 해당 페이지 에서   
   sample_subpage 안에 .html 파일 생성해서 연결하여 체크 해보면 된다.  
   Build Variants 는 Target sample 로 변경한 상태에서 진행 한다.  

3. Branch Name Rule (작업 브렌치 사용 Rule) 

   main branch 에는 작업 Branch 최종 작업 이후 확인 완료된 사항을 체크후  
   Merge 해야 합니다.  
   작업 branch 명은 하기와 같이 작명 하여 최소한 구분이 가능 하게 생성후   
   작업 바랍 니다.  
   작업간 최대한 용이한 작업을 위하여 Git Request Merge 기능은 비활성화 하겠습니다.

   날짜_내용    
   예시  
    - 20231031_chasi  

4. 작업시 Target (Build Variants)

   debug => 작업 전용 구간

   sample => debug 쪽으로 작업한 사항 적용전 test 구간  

   release => 배포 구간 (개발시에는 사용하지 않습니다.)

5. local.properties 파일 관련

   local_properties_backup 폴더 쪽에  
   backup 해놨으며 프로젝트 설정시 가져다    
   사용하고 해당 PC 에 설정된 기준으로 Android SDK 위치만 잡아주면 된다.  
   해당 파일이 놓여지는 위치는 /local.properties 이다   
   프로젝트 Root 하단 gitignore 에서 배제시켜 놓았으니  
   Git 으로 올라가는 일은 없다.

   프로젝트 내부에 local.properties 라는 파일이 있음     
   해당 파일은 안드로이드 프로젝트 초기 설정시   
   현재 프로젝트를 구동하기위한 안드로이드 sdk 프레임을 설정하기 위한    
   파일이다. 그래서 각 사용자가 사용하는 PC 마다의 설치 위치가  
   같을수는 없어서 local.properties 파일에 대한 내용을 여기에 첨부한다.

   C:\:\\Users\\user\\AppData\\Local\\Android\\Sdk => For PC 의 경우 예시    
   /Users/vsd/Library/Android/sdk => For Mac 일 경우의 예시  
   sdk.dir=[sdk 위치 경로]

6. 대용량 파일을 업로드 위한 Git 설정 (GitHub / GitLab)  

   참고 : 현재 프로젝트내 .gitattributes 는 설정이 되어 있음    

   현재 사항은 GitHub / GitLab 공통 사항 이며  
   파일 하나당 올릴수 있는 제한이  
   100MB 이다. 그래서 그걸 넘어가면 현재의 lfs 를 사용해야 한다.

   GitHub 기준  
   전체 기본 제공되는 용량은 4GB 정도 이다.     
   50GB 를 추가 구매하였음. 참고 (GitHub 에서)  
  
   GitLab 기준  
   또 전체 기본 제공 되는 용량은 5GB 정도 이다.       
   아마도 용량이 필요 하면 구매는 필 수 일듯     

   현재 사항을 만나게 되면 발췌 되는 로그  
   remote: GitLab: You are attempting to check in one or more blobs which exceed the 100.0MiB limit:  

   Git Large File Storage 설치  (참조)  
    - https://git-lfs.com/  
      전반 내용  
    - https://velog.io/@shin6949/Git-LFS-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0    
   
   방법  
   
   프로젝트 내 lfs 설치 (프로젝트 Root 경로에서 / 이건 한번만 설치 해주면 이후 부터는 필요 없다.)
   - git lfs install  
   - git lfs track "*.mp4"  
   - git add .gitattributes  
   
   프로젝트 내 파일이 100MB 가 넘는 경로에서 하기의 사항 실행  
   - 100MB 가 넘는 리소스가 위치한 경로로 이동후 아래 명령어      
     git add .   
     git commit -m "남길 메세지"  
     git push origin main  
   
7. Git 에서 Commit / push 할때 credential helper 사용 (한번 아이디 / 비번 입력 후에 재사용 가능)  
  - git config --global credential.helper cache  
  - git config --global credential.helper store  

# 기본 업무 여건

영업 쪽에서 Network OFF LINE 모드로  
바로 개방하여 컨텐츠를 확인가능해야 한다는 사항으로  
최초 시작 되어 이에 웹자원을 APP 내에 이식하게 되었으며   
해당 경로는 app => src => main => assets 이다.  
현재의 자원은 웹뷰 컨테이너와 상호 연관 관계가 있으며   
해당 경로는 app => src => main => java  
Native 기본 언어는 kotlin  
웹자원은 큰분류로 나누면 HTML5 / CSS / SCRIPT 이다.  
웹자원의 리소스는 종류가 다양하여 생략 하겠다.

# 배포처

구글 스토어에 올리는 목적으로 만들어진 사항이 아닙니다.  
OFF LINE 으로 저희쪽 타겟 단말에 직접 설치 하여 사용 됩니다.

# 비상 교육 에듀 테크와 동반 및 연동 되는 앱

저희가 만든 비상 교육 에듀 테크가 메인 앱이며  
추가적인 컨텐츠를 연동하여 외부에 홍보 및 보여주기 위하여  
동반되는 앱이 있습니다. 저희 앱 포함 총 20 개의 앱이  
설치되게 되어 있으며 저희쪽 관할 아래 진행 되었 습니다.      
현재의 동반되는 앱 또한 OFF LINE 기반으로 하는 앱들이며    
구글 스토어를 통한 다운로드 혹은 외부 원격 자원을 통한 다운로드 설치 또한 없습니다.

# 퍼블 진행 및 웹 로컬 자원 할당 영역

app => src => main => 하단부분  
해당 하단 부분에 audio / fonts / img / js / pdf / video   
는 샘플 및 테스트를 위한 폴더들   
출력할 html 은 assets root 에 위치한다.  
html 하나에 그 html 과 연관된 (Resource) 폴더 일체가 매칭 되는 구조

index.html => Entry Page

# 웹 컨테이너 영역

app => src > main => java

# 진행 Target 단말

삼성 지정 테블릿 SM-X700

# 단말 ADB 명령어

윈도우 CMD 창 혹은 Android Studio Terminal (하단 카테고리에 있음) 창에서   
adb devices => 단말 접속 확인   
adb reboot => 단말 재부팅

# 단말과 PC 연결후 디버깅 방법

PC 에 단말을 연결후 정상인식이 됨을 확인  
윈도우 터미널 혹은 안드로이드 스튜디오 에서   
adb devices 명령어 치고 리스트에 나오면 연결된것임   
거기서 chrome 을 열어서 주소창에 chrome://inspect 치면  
해당 단말에 뷰가 출력됨 간혹 연결이 끊길때는 선을 뺏다 다시 하거나 혹은  
단말 리부팅후 재접속 시도해봄 해당화면에서 f12 눌르면 웹에서 f12 누른 것처럼  
디버깅 가능

# 유의 사항

하기의 사항에 대한 파일은

local_properties_backup 폴더쪽에
backup 해놨으며 프로젝트 설정시 가져다  
사용하고 해당 PC 에 설정된 Android SDK 위치만 잡아주면 된다.
해당 파일이 놓여지는 위치는 /local.properties 이다
프로젝트 Root 하단

프로젝트 내부에 local.properties 라는 파일이 있음   
해당 파일은 안드로이드 프로젝트 초기 설정시   
현재 프로젝트를 구동하기위한 안드로이드 sdk 프레임을 설정하기 위한  
파일이다. 그래서 각 사용자가 사용하는 PC 마다의 설치 위치가  
같을수는 없어서 local.properties 파일에 대한 내용을 여기에 첨부한다.

C:\:\\Users\\user\\AppData\\Local\\Android\\Sdk => For PC 의 경우 예시  
/Users/vsd/Library/Android/sdk => For Mac 일 경우의 예시  
sdk.dir=[sdk 위치 경로]

# Android Studio File Encoding 설정

좌측 상단 Android studio => Settings => Editor => File Encodings

Global Encoding => UTF-8  
Project Encoding => UTF-8  
Properties Files => UTF-8

Android Studio Tool 우측 최하단 설정된 인코딩 확인

# Android Studio 자주 사용할 단축키 (window 기준)

전체 찾기  
Find Path  
CTRL + SHIFT + F

전체 바꾸기  
CTRL + SHIFT + R

# Android Studio Tool Version

Android Studio Flamingo | 2022.2.1 Patch 2  
Build #AI-222.4459.24.2221.10121639, built on May 12, 2023  
Runtime version: 17.0.6+0-17.0.6b802.4-9586694 x86_64  
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.

# Android Studio Tool Release Link

Android Studio 툴 버전별 다운 로드 링크 이다.  
https://developer.android.com/studio/archive?hl=en

# Web Assets Tree Structure

app => assets 내 하단의 폴더 들이 해당 assets 내 root 경로 내에 위치 하는 n 개 이상에  
html 과 맵핑 되는 형식의 직관 적인 구조를 가진다.

# Tablet 단말내 탑재될 바탕 화면 이미지

tablet_bg 폴더 안에 있으며 해당 이미지는  
앱내에서 사용하는 것이 아닌 영업용 테블릿 바탕화면 이미지이다. 참고

# custom Android Studio VM options, see https://developer.android.com/studio/intro/studio-config.html

Help >> Edit Custom VM Options
-Xms1024m
-Xmx4096m
-XX:MaxPermSize=1024m
-XX:ReservedCodeCacheSize=512m
-XX:CodeCacheExpansionSize=2g
-Dsun.io.useCanonCaches=false
-Djna.nosys=true
-Djna.debug_load=true
-Djna.debug_load.jna=true
-Djsse.enableSNIExtension=false
-XX:+UseCodeCacheFlushing
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-Didea.platform.prefix=AndroidStudio
-Didea.paths.selector=AndroidStudio

# Gradle

1. Project > build.gradle
   Android Studio >> Settings >> Build Execution Deployment >> Build Tools >> Gradle
   상황에 따라 Version Up 필요
   Android Studio >> Settings >> Build, Execution, Deployment >> Deployment 에서 다음 두 사항 체크 (옵션)

- Automatically performs check All
  File >> Project Structure >> Project
  (하기의 버전 호환성 반드시 맞춰야 한다.)
  Android Gradle Plugin Version
- 8.0.2
  Gradle Version
- 8.0
  Android Gradle JDK Setting
- Android Studio >> Settings >> Build Execution Deployment >> Build Tools >> Gradle
  (Gradle JDK 부분 확인)
  Project > app > build.gradle
  Project > Gradle.properties

유의 사항

- Gradle 쪽에 Android >> Settings >> Gradle-Android Compiler
  (현 위치에 Command line-options 왠만 해선 기재 하지 말것)

# Mac 에서 Android Studio 설치시

설치 방법  

- brew (https://formulae.brew.sh/cask/android-studio)  
  명령어 => brew install --cask android-studio  
- Download From URL (https://developer.android.com/studio/archive?hl=en)  

설치 위치  

- cd /  
- Applications  
- cd Android\ Studio.app  
- cd Contents  

주요 설정 파일  

- /Applications/Android\ Studio.app/Contents/bin/idea.properties  
- /Applications/Android\ Studio.app/Contents/Info.plist  

설치된 사항 완전 삭제  

- Deletes the Android Studio application Completely  
   rm -Rf /Applications/Android\ Studio.app  
   rm -Rf ~/Library/Preferences/Google/AndroidStudio*  
   rm -Rf ~/Library/Preferences/com.google.android.*  
   rm -Rf ~/Library/Preferences/com.android.*  
   rm -Rf ~/Library/Application\ Support/Google/AndroidStudio*  
   rm -Rf ~/Library/Logs/Google/AndroidStudio*  
   rm -Rf ~/Library/Caches/Google/AndroidStudio*  
   rm -Rf ~/.AndroidStudio*  

# Mac 에서 작업시 Android Studio Trouble Shooting

1. MAC 전체 소프트 웨어 업데이트 진행후 Android Studio 실행 아이콘 클릭 했음 에도 실행 안됨

- 명령어 실행 (sudo /Applications/Android\ Studio.app/Contents/MacOS/studio)

2. 라이브러리 간 종속성 처리

- 반드시 상호 처리가 동작이 보장 되는 버전에 대한 검증이 완료된 사항을 기준 으로 동작 한다.
- Android Studio 내에 지정하는 버전에 대한 라이브러리 버전 업데이트가 되어야 한다.
  (File >> Project Structure >> Dependencies)
- 현재의 사항이 정상적 으로 처리가 되지 않으면 프로젝트 정상 설정 되지 않음 유의

# 현 Project 내 탑재 Library 관련한 사항

- OFF Line Library
  app >> libs (현재 위치에 탑재된 사항이 내부에 적재된 라이브러리이다.)
  현재의 라이브러리 중 vstdn-lib-1.6-release.aar 은 라이브러리 모듈형 추출 프로젝트 만들어서
  별도 개발후 export 한 라이브러리이다 참고
  조금 현재의 프로젝트에서 중요한 부분에서 사용되는 기능은 별도로 내재화 하였다 참고
- ON Line Library
  대부분 androidx 관련 패키지임 즉 android 에서 통합으로 관리되어지는 사항들이다.

# MultiDex 관련한 사항

- 앱에서 참조하는 라이브러리 내부외부 포함 65,536 을 넘어가면 Android 빌드시에
  제한을 겁니다. 이에 해당 사항을 방지하기위해 통상적으로 활성화를 시키는데
  대부분 release 배포시에 적용을 합니다. 이유는 에러 방지도 있지만
  소스 난독화 및 최적화 부분에서 동반되기 떄문에 피해갈 수 없습니다.
  그렇지만 Debug 일때는 Multidex 를 비활성화 시켜놓았습니다.
  소스 Merger 가 가동되는 시간이 포함되기 때문에 Build 속도가 떨어질 수 있습니다.
  (https://developer.android.com/studio/build/multidex?hl=ko)

# 웹 Assets 에서 작업시 참고 사항

- .html 파일에서 오른쪽 버튼 누르고 Open In 에서 브라우저로 화면 확인 가능
  작업시에 Build 해서 설치 확인하는데 시간소요가 조금 있다면
  해당 사항으로 확인하고 최종확인은 반드시 단말내에서 설치해서 확인

# GitLab 혹은 Github SSH 사용 위한 발급 절차

MAC 기준  
~ ssh-keygen    
~ cd ~/.ssh  
ls -al  
cat id_rsa.pub    
=> 추출된 키 Copy And Paste  

# check_1 ()

# check_2 ()

# check_1_1

# check_1_2 











