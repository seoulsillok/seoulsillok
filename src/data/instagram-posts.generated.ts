export type InstagramPost = {
  title: string;
  url: string;
  caption: string;
  video?: { src: string; poster?: string };
  timestamp?: string;
};

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/seoulsillok/";

export const INSTAGRAM_POSTS_BY_DONG: Record<string, InstagramPost[]> = {
  "dongjak:흑석동": [
    {
      "title": "흑석동",
      "url": "https://www.instagram.com/p/DQrUPrpEigq/?img_index=1",
      "caption": "흑석동 산책로\n\n1. 진미순대 (점심)\n2. 한강 산책로 (산책)\n3. 스페이스노들케이 (카페)\n\n내가 사는 곳을 잘 몰랐기에, 새로운 동을 가보기로 결심했다. 서울은 넓고 아름다웠다.\n\nHeukseok-dong Walk Route\n\n1. Jinmi Sundae (Lunch)\n2. Hangang Trail (Walk)\n3. Space Nodeul K (Cafe)\n\nBecause I did not know the place I live in, I decided to visit a new dong. Seoul was big and beautiful.\n\n#서울 #흑석동 #흑석동맛집 #흑석동맛집추천 #흑석동카페 #흑석동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #heukseok_dong"
    }
  ],
  "dongdaemun:휘경동": [
    {
      "title": "휘경동",
      "url": "https://www.instagram.com/p/DQrXt20krZG/?img_index=1",
      "caption": "휘경동 산책로\n\n1. 베러댄 (카페)\n2. 배봉산둘레길 (산책)\n3. 놀부만두 (저녁)\n4. 카페드립 (카페)\n5. 휘경1수변공원 (산책)\n\n사람 냄새 물씬 나는 장소들을 발견했다. 만둣집 사장님은 만두를 쉼 없이 빚으면서도 메뉴 추천에 입맛에는 맞는지도 물어봐 주셨다. 카페드립은 알록달록한 건물부터 귀여운 인테리어 소품 하나하나 신사 할아버지 사장님의 취향이 드러났다. 다정함과 취향은 참 소중하다.\n\nHwigyeong-dong Walk Route\n\n1. Better Than (Cafe)\n2. Baebong Mountain Trail (Walk)\n3. Nol Bu Dumpling (Dinner)\n4. Cafe Drip (Cafe)\n5. Hwigyeong 1 Waterfront Park (Walk)\n\nI came across some places where you can get a feel for humanity. The dumpling shop owner, even while he was relentlessly making dumplings, gave me menu recommendations and asked if the food was to my liking. Cafe Drip had a colorful building with cute interiors which showed the elderly gentleman owner’s personal taste. Kindness and personal taste are truly precious.\n\n#서울 #휘경동 #휘경동맛집 #휘경동맛집추천 #휘경동카페 #휘경동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #hwigyeong_dong"
    }
  ],
  "yongsan:후암동": [
    {
      "title": "후암동",
      "url": "https://www.instagram.com/p/DQtIfEzElTF/?img_index=1",
      "caption": "후암동 산책로\n\n1. 콤포타블 커피 남산점 (카페)\n2. 용산도서관 & 남산도서관 (산책)\n3. 산동만두 (저녁)\n4. 사운드독 (재즈바)\n\n내가 좋아하는 것이 전부 모여있는 곳이다: 책, 음악, 경치. 그리고 적지도 많지도 않은 사람들. 해방촌의 감성을 조용하게 즐기고 싶다면 후암동에 와보는 것도 좋을 것이다. 거리에 즐비한 보물 같은 카페들은 덤.\n\nHuam-dong Walk Route\n\n1. Komfortable Coffee Namsan (Cafe)\n2. Yongsan Library & Namsan Library (Walk)\n3. Shan Dong Dumpling (Dinner)\n4. Sound Dog (Jazz Bar)\n\nThis place has everything I love: books, music, scenery. Also it’s lively but not packed. If you want to feel the HBC vibe but more peacefully, then Huam-dong is the place to visit. And the precious cafes that are spread across the streets are an added bonus.\n\n#서울 #후암동 #후암동맛집 #후암동맛집추천 #후암동카페 #후암동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Huam_dong"
    }
  ],
  "yongsan:효창동": [
    {
      "title": "효창동",
      "url": "https://www.instagram.com/p/DQtMLLEknMh/?img_index=1",
      "caption": "효창동 산책로\n\n1. 아뜰리에콩포트 (점심)\n2. 우스블랑 / 마티사 (카페)\n3. 효창공원 (산책)\n4. 키하라 (카페)\n5. 백범김구기념관 (산책)\n\n대낮부터 잉어빵을 사러 사람들이 줄 서 있길래 궁금해서 나도 기다려 먹어봤다. 팥이 꼬리 끝까지 차있었다. 작은 디테일이 큰 차이를 만드는 이 기조가 다른 가게에도 만연했다. 조용한 동에 알찬 곳들.\n\nHyochang-dong Walk Route\n\n1. Atelier Compote Hyochang (Lunch)\n2. Ours Blanc / Matassa (Cafe)\n3. Hyochang Park (Walk)\n4. Kihara (Cafe)\n5. KimKoo Museum (Walk)\n\nPeople were forming a line to eat fish-shaped bun in the daytime so I had to give it a try. The red bean paste was filled until the tail tip. Small detail makes a big difference: this tendency was prevalent in other shops as well. A quiet dong with solid content.\n\n#서울 #효창동 #효창동맛집 #효창동맛집추천 #효창동카페 #효창동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hyochang_dong"
    }
  ],
  "jung:회현동": [
    {
      "title": "회현동",
      "url": "https://www.instagram.com/p/DQtwQKiEinB/?img_index=1",
      "caption": "회현동 산책로\n\n1. 부원면옥 (점심)\n2. 피크닉 (전시관)\n3. 일루소 커피 (카페)\n4. 서울로 7017 / 백범광장공원 (산책)\n\n이렇게 역동적인 동이 또 있을까. LP와 우편을 파는 회현지하센터, 옷을 저렴하게 살 수 있는 남대문시장, 이들과 대비되는 신세계 백화점 본점, 그리고 도심 속 웅장한 숭례문까지. 예쁜 공간인 피크닉에서 전시를 보고나서는 두 산책로를 추천한다. 도심을 더 즐기고 싶으면 서울로 7017, 성곽길을 따라 걷고 싶으면 백범광장공원. 누가 와도 취향에 맞는 걸 찾을 수 있을 것이다. \n\nHoehyeon-dong Walk Route\n\n1. Buwon Myeonok (Lunch)\n2. Piknic (Gallery)\n3. Illuso Coffee (Dinner)\n4. Seoullo 7017 / Baekbeom Square (Walk)\n\nCould there be any other dong as dynamic as this? There’s the Hoehyeon Underground Shopping Center selling LPs and stamps, Namdaemun Market where you can buy clothes affordably, juxtaposed with the Shinsegae Department Store Main Branch, and the magnificent Sungnyemoon Gate in the heart of the city. After enjoying an exhibition at the beautiful space, Piknic, I recommend two walking paths. If you want to enjoy more of the city, head to Seoullo 7017. If you'd like to walk along the fortress wall, there's Baekbeom Square. No matter who visits, they are sure to find something that suits their taste.\n\n#서울 #회현동 #회현동맛집 #회현동맛집추천 #회현동카페 #회현동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hoehyeon_dong"
    }
  ],
  "dongdaemun:회기동": [
    {
      "title": "회기동",
      "url": "https://www.instagram.com/p/DQt0XqkEg9F/?img_index=1",
      "caption": "회기동 산책로\n\n1. 컴투레스트 (카페)\n2. 경희대학교 (산책)\n3. 비반트 (카페)\n4. 오관스시 / 시키카츠 (저녁)\n\n경희대로 가득 채워진 동. 캠퍼스가 예뻐서 산책할 맛이 난다. 학생들 대상으로 가격이 착한 가게들. 그 중에서 맛있는 곳들로 뽑아봤다.\n\nHoegi-dong Walk Route\n\n1. Come To Rest (Cafe)\n2. Kyung Hee University (Walk)\n3. Vivant (Cafe)\n4. Five Gwan Sushi / Siki Kats (Dinner)\n\nA dong filled with Kyung Hee University. The campus is pretty, which makes for a great walk. There are shops with affordable prices targeting students. Among them, I've picked out the delicious ones.\n\n#서울 #회기동 #회기동맛집 #회기동맛집추천 #회기동카페 #회기동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hoegi_dong"
    }
  ],
  "jung:황학동": [
    {
      "title": "황학동",
      "url": "https://www.instagram.com/p/DQwiXB3kph_/?img_index=1",
      "caption": "황학동 산책로\n\n1. 올로지에스프레소 (카페)\n2. 고사리 익스프레스 (저녁)\n3. 중앙시장 (산책)\n4. 이포어묵 (야식)\n5. 히피히피 (LP바)\n6. 청계천 (산책)\n\n50년동안 자리를 지키며 호떡을 팔아오신 할머니와 에스프레소, 고사리, 어묵, 다들 뭐 하나에 미쳐있는 곳. 맛도 하나같이 미쳤다.\n\nHwanghak-dong Walk Route\n\n1. Oology Espresso (Cafe)\n2. Gosari Express (Dinner)\n3. Jungang Market (Walk)\n4. Ipo Fish Cake (Snack)\n5. Hippie Hippy (LP Bar)\n6. Cheonggyecheon (Walk)\n\nGrandma who’s been selling hotteok for 50 years, alongside those who are insane over espresso, gosari, fish cake. Their taste are just as insane.\n\n#서울 #황학동 #황학동맛집 #황학동맛집추천 #황학동카페 #황학동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hwanghak_dong"
    }
  ],
  "gwangjin:화양동": [
    {
      "title": "화양동",
      "url": "https://www.instagram.com/p/DQy8eqBkkML/?img_index=1",
      "caption": "화양동 산책로\n\n1. 정면 (점심)\n2. 최가커피회관 (카페)\n3. 건리단길 (산책)\n4. MouseRabbit (Cafe)\n5. 호야초밥참치 (저녁)\n6. 모츠커피 (카페)\n7. 일감호 (산책)\n\n새로운 경험은 귀하다. 그래서 새로운 경험을 시켜주는 친구와 장소도 귀하다. 최가커피는 더치커피를 온더락으로 마셔볼 수 있는 곳이다. 향기로운 커피, 감성 있는 메뉴판과 음료 엽서는 여운을 주기에 충분하다.\n\nHwayang-dong Walk Route\n\n1. Jung Myeon (Lunch)\n2. Choiga Coffee (Cafe)\n3. Geonridan Street (Walk)\n4. MouseRabbit (Cafe)\n5. Hoya Sushi (Dinner)\n6. Mots Coffee (Cafe)\n7. Ilgam Lake (Walk)\n\nNew experiences are precious. That’s why friends and places that offer these new experiences are also precious. Choiga Coffee offers Dutch coffee on the rocks. Aromatic coffee, aesthetic menu, and drink postcar are more than enough to leave a lasting impression.\n\n#서울 #화양동 #화양동맛집 #화양동맛집추천 #화양동카페 #화양동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hwayang_dong"
    }
  ],
  "gangseo:화곡동": [
    {
      "title": "화곡동",
      "url": "https://www.instagram.com/p/DQ1TNoSEqLr/?img_index=1",
      "caption": "화곡동 산책로\n\n1. 화곡영양족발 (점심)\n2. 우장산 (산책)\n3. 플래브베이커리 (카페)\n\n시장, 산, 공원은 서울 전역에 빽빽하게 분포해 있다. 화곡동에서는 시장 3개, 산 4개, 공원 수십 개로 이들을 특히 쉽게 찾을 수 있다. 이번 산책에서는 화곡본동시장에 자리 잡은 유명한 화곡영양족발을 방문했다. 양이 푸짐해서 배부르게 먹고 우장산에서 산책을 하고, 예쁜 베이커리 카페에서 후식을 먹도록 해보자.\n\nHwagok-dong Walk Route\n\n1. Hwagok Yeongyang Jokbal (Lunch)\n2. Ujangsan Mt. (Walk)\n3. Fleuve Bakery (Cafe)\n\nMarkets, mountains, and parks are densely distributed throughout Seoul. In Hwagok-dong, they are especially easy to find, with three markets, four mountains, and dozens of parks. On this walk, we will visit the famous Hwagok Yeongyang Jokbal, located in Hwagokbon-dong Market. Since the portions are generous, let's eat a full, hearty meal, then take a walk at Ujangsan Mountain, and finish with dessert at a pretty bakery cafe.\n\n#서울 #화곡동 #화곡동맛집 #화곡동맛집추천 #화곡동카페 #화곡동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hwagok_dong"
    }
  ],
  "seodaemun:홍제동": [
    {
      "title": "홍제동",
      "url": "https://www.instagram.com/p/DQ4QFxhElNY/?img_index=1",
      "caption": "홍제동 산책로\n\n1. 히자우커피바 (카페)\n2. 유진치킨 (저녁)\n3. 홍제천길 (산책)\n\n예쁜 공간, 예쁜 사람들.\n\nHongje-dong Walk Route\n\n1. Hijau Coffee Bar (Cafe)\n2. Yujin Chicken (Dinner)\n3. Hongjaechun (Walk)\n\nBeautiful space, beautiful people.\n\n#서울 #홍제동 #홍제동맛집 #홍제동맛집추천 #홍제동카페 #홍제동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hongje_dong"
    }
  ],
  "seodaemun:홍은동": [
    {
      "title": "홍은동",
      "url": "https://www.instagram.com/p/DQ62ubMEvdR/?img_index=1",
      "caption": "홍은동 산책로\n\n1. 호짜 (점심)\n2. 스위스 그랜드 호텔 (카페)\n3. 카페폭포 (산책)\n4. 크레페허브 (카페)\n\n꿈같은 장소.\n\nHongeun-dong Walk Route\n\n1. Hojja (Lunch)\n2. Swiss Grand Hotel (Cafe)\n3. Cafe Pokpo (Walk)\n4. Crepe Hub (Cafe)\n\nSurreal place.\n\n#서울 #홍은동 #홍은동맛집 #홍은동맛집추천 #홍은동카페 #홍은동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hongeun_dong"
    }
  ],
  "jongno:혜화동": [
    {
      "title": "혜화동",
      "url": "https://www.instagram.com/p/DQ9oPsalcnp/",
      "caption": "혜화동 산책로\n\n1. 와룡공원길 (산책)\n2. 와룡공원 (산책)\n3. 성균관대학교 (산책)\n\n찬란한 축복의 낮과\n어둡고 성스러운 밤\n그리고 난 홀로 생각하죠\n이 얼마나 아름다운 세상인가요\n\nHyehwa-dong Walk Route\n\n1. Waryong Park Route (Walk)\n2. Waryong Park (Walk)\n3. Sungkyunkwan University (Walk)\n\nThe bright blessed day\nThe dark sacred night\nAnd I think to myself\nWhat a wonderful world\n\n#서울 #혜화동 #혜화동맛집 #혜화동맛집추천 #혜화동카페 #혜화동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hyehwa_dong",
      "video": {
        "src": "/videos/DQ9oPsalcnp.mp4",
        "poster": "/videos/DQ9oPsalcnp.jpg"
      }
    }
  ],
  "guro:항동": [
    {
      "title": "항동",
      "url": "https://www.instagram.com/p/DRBZHxokrFn/",
      "caption": "항동 산책로\n\n1. 제이라오 (저녁)\n2. 푸른수목원 & 항동철길 (산책)\n3. 9로평상 (카페)\n\n삶은 누구에게나 실험이고 중독의 연속이다.\n그 중독으로부터 조금 멀어지는 실험을 해보자.\n무언가를 깨트리는 것은 경계를 부풀리는 새로움을 전해줄 것이다.\n익숙함으로부터 멀리 벗어나는 건 쉽지 않겠지만, 인정하자\n살아가며 우리가 배운 건 영원한 것은 없다는 거, 아닌가?\n\nHang-dong Walk Route\n\n1. J.Rao (Dinner)\n2. Pureun Arboretum & Hang-dong Railroad (Walk)\n3. 9ro-Pyeong Sang (Cafe)\n\nLife is an experiment for everyone, and a continuous series of addictions.\nLet’s try an experiment to step back from those habits.\nBreaking the mold brings a freshness that pushes our boundaries.\nIt isn‘t easy to leave familiarity behind, but let’s face it—\nHaven‘t we learned by now that nothing is eternal?\n\n#서울 #항동 #항동맛집 #항동맛집추천 #항동카페 #항동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hang_dong",
      "video": {
        "src": "/videos/DRBZHxokrFn.mp4",
        "poster": "/videos/DRBZHxokrFn.jpg"
      }
    }
  ],
  "mapo:합정동": [
    {
      "title": "합정동",
      "url": "https://www.instagram.com/p/DRCkc2eEr7T/",
      "caption": "합정동 산책로\n\n1. 저스티나 (저녁)\n2. 망원한강공원 (산책)\n3. 양화대교 (산책)\n\n어디든 데려가 줄래\n작은방을 나만의 해변으로 개조해\n웃음 지으며\n\nHapjeong-dong Walk Route\n\n1. Gjustina (Dinner)\n2. Mangwon Hangang Park (Walk)\n3. Yanghwa Bridge (Walk)\n\nWon‘t you take me anywhere?\nTurn this little room into my own private beach\nWith a smile\n\n#서울 #합정동 #합정동맛집 #합정동맛집추천 #합정동카페 #합정동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hapjeong_dong",
      "video": {
        "src": "/videos/DRCkc2eEr7T.mp4",
        "poster": "/videos/DRCkc2eEr7T.jpg"
      }
    }
  ],
  "yongsan:한남동": [
    {
      "title": "한남동 · 한강로동",
      "url": "https://www.instagram.com/p/DRHyPSSkjTI/",
      "caption": "한남동, 한강로동 산책로\n\n1. 한남더힐 (산책)\n2. 브라이튼 한남 (산책)\n3. 한남 리첸시아 (산책)\n4. 아모레퍼시픽 사옥 (산책)\n5. 레미안 용산 더 센트럴 (산책)\n6. 용산 센트럴파크 (산책)\n\n아파트 아파트 아파트 아파트 아파트 아파트 Uh, uh huh uh huh\n아파트 아파트 아파트 아파트 아파트 아파트 Uh, uh huh uh huh\n뭐든지 뭐든지 뭐든지 네가 좋은 대로 이 아파트를 클럽으로 바꿔 내 말은, 마시고, 춤추고, 피우고, 즐기고, 밤새 파티하자는 거야 건배 건배 girl, 어때 Oh oh oh 내가 널 원하는 것처럼 너도 날 원하지 않아, baby 지금 내가 널 필요로 하는 것처럼 너도 내가 필요하지 않아 잠은 내일 자고 오늘 밤은 미쳐보자 넌 그냥 날 만나러 오기만 하면 돼\n\nHannam-dong, Hangangno-dong Walk Route\n\n1. Hannam The Hill (Walk)\n2. Brighten Hannam (Walk)\n3. Hannam Richensia (Walk)\n4. Amorepacific HQ (Walk)\n5. Raemian Yongsan The Central (Walk)\n6. Yongsan Central Park (Walk)\n\nAPT APT APT APT APT APT Uh, uh huh uh huh\nAPT APT APT APT APT APT Uh, uh huh uh huh\nIt’s whatever it’s whatever it’s whatever you like\nTurn this apartment into a club I’m talking drink, dance, smoke, freak, party all night\nCheers, cheers, girl what’s up Oh oh oh\nDon’t you want me like I want you, baby\nDon’t you need me like I need you now\nSleep tomorrow but tonight go crazy\nAll you gotta do is just meet me at the\n\n#서울 #한남동 #한강로동 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hannam_dong #Hangangno_dong",
      "video": {
        "src": "/videos/DRHyPSSkjTI.mp4",
        "poster": "/videos/DRHyPSSkjTI.jpg"
      }
    }
  ],
  "yongsan:한강로동": [
    {
      "title": "한남동 · 한강로동",
      "url": "https://www.instagram.com/p/DRHyPSSkjTI/",
      "caption": "한남동, 한강로동 산책로\n\n1. 한남더힐 (산책)\n2. 브라이튼 한남 (산책)\n3. 한남 리첸시아 (산책)\n4. 아모레퍼시픽 사옥 (산책)\n5. 레미안 용산 더 센트럴 (산책)\n6. 용산 센트럴파크 (산책)\n\n아파트 아파트 아파트 아파트 아파트 아파트 Uh, uh huh uh huh\n아파트 아파트 아파트 아파트 아파트 아파트 Uh, uh huh uh huh\n뭐든지 뭐든지 뭐든지 네가 좋은 대로 이 아파트를 클럽으로 바꿔 내 말은, 마시고, 춤추고, 피우고, 즐기고, 밤새 파티하자는 거야 건배 건배 girl, 어때 Oh oh oh 내가 널 원하는 것처럼 너도 날 원하지 않아, baby 지금 내가 널 필요로 하는 것처럼 너도 내가 필요하지 않아 잠은 내일 자고 오늘 밤은 미쳐보자 넌 그냥 날 만나러 오기만 하면 돼\n\nHannam-dong, Hangangno-dong Walk Route\n\n1. Hannam The Hill (Walk)\n2. Brighten Hannam (Walk)\n3. Hannam Richensia (Walk)\n4. Amorepacific HQ (Walk)\n5. Raemian Yongsan The Central (Walk)\n6. Yongsan Central Park (Walk)\n\nAPT APT APT APT APT APT Uh, uh huh uh huh\nAPT APT APT APT APT APT Uh, uh huh uh huh\nIt’s whatever it’s whatever it’s whatever you like\nTurn this apartment into a club I’m talking drink, dance, smoke, freak, party all night\nCheers, cheers, girl what’s up Oh oh oh\nDon’t you want me like I want you, baby\nDon’t you need me like I need you now\nSleep tomorrow but tonight go crazy\nAll you gotta do is just meet me at the\n\n#서울 #한남동 #한강로동 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hannam_dong #Hangangno_dong",
      "video": {
        "src": "/videos/DRHyPSSkjTI.mp4",
        "poster": "/videos/DRHyPSSkjTI.jpg"
      }
    }
  ],
  "nowon:하계동": [
    {
      "title": "하계동",
      "url": "https://www.instagram.com/p/DRKhxheEi3k/",
      "caption": "하계동 산책로\n\n1. 예노 (카페)\n2. 충숙근린공원 (산책)\n3. 경춘숲공원 (산책)\n\n아슬히 고개 내민 내게\n첫 봄인사를 건네줘요\n피울 수 있게 도와줘요\n\nHagye-dong Walk Route\n\n1. IIeno (Cafe)\n2. Chungsuk Park (Walk)\n3. Gyeongchun Line Forest Park (Walk)\n\nTo me, tentatively raising my head \nPlease say your first hello of spring\nHelp me so I can bloom\n\n#서울 #하계동 #하계동맛집 #하계동맛집추천 #하계동카페 #하계동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Hagye_dong",
      "video": {
        "src": "/videos/DRKhxheEi3k.mp4",
        "poster": "/videos/DRKhxheEi3k.jpg"
      }
    }
  ],
  "jung:필동": [
    {
      "title": "필동",
      "url": "https://www.instagram.com/p/DUVqQZXlMzx/",
      "caption": "필동 산책로\n\n1. 필동면옥 (점심)\n2. 카페허블 (카페)\n3. 몽트 (카페)\n4. 남산골한옥마을 (산책)\n5. 비움갤러리 (산책)\n6. 남산북측숲길 (산책)\n\n아슬히 고개 내민 그대\n얼마나 기다렸을까요\n꽃 필 수 있게 도울게요\n\nPil-dong Walk Route\n\n1. Pildong Myeonok (Lunch)\n2. Cafe Hubble (Cafe)\n3. Mont (Cafe)\n4. Namsangol Hanok Village (Walk)\n5. Beeum Gallery (Walk)\n6. Namsan Northern Forest Trail (Walk)\n\nYou, who timidly poked your head out,\nHow long must you have waited?\nI will help you bloom\n\n#서울 #필동 #필동맛집 #필동맛집추천 #필동카페 #필동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Pil_dong",
      "video": {
        "src": "/videos/DUVqQZXlMzx.mp4",
        "poster": "/videos/DUVqQZXlMzx.jpg"
      }
    }
  ],
  "songpa:풍납동": [
    {
      "title": "풍납동",
      "url": "https://www.instagram.com/p/DUayEMCDo7n/",
      "caption": "풍납동 산책로\n\n1. 태백식당 (점심)\n2. 두부부 (베이커리)\n3. 인트로 베이커리 (베이커리)\n4. 풍납백제 문화공원 (산책)\n5. 광나루 한강공원 (산책)\n6. 유천냉면 (저녁)\n\n머물 곳 잃은 마음은\n정처 없이 계절을 헤매이고\n흩어지는 찰나의 순간들을\n두 눈 가득히 꾹꾹 눌러 담네\n\nPungnap-dong Walk Route\n\n1. TaeBaek Restaurant (Lunch)\n2. Dobubu (Bakery)\n3. Intro Bakery (Bakery)\n4. Pungnap Baekje Cultural Park (Walk)\n5. Gwangnaru Hangang Park (Walk)\n6. Yucheon Naengmyeon (Dinner)\n\nA heart with nowhere to rest\nWanders aimlessly through the seasons\nThose scattering, fleeting moments\nI fill my eyes, pressing them deep inside\n\n#서울 #풍납동 #풍납동맛집 #풍납동맛집추천 #풍납동카페 #풍납동카페추천 #산책 #산책로 #맛집 #카페 #korea #seoultravel #seoul #Pungnap_dong",
      "video": {
        "src": "/videos/DUayEMCDo7n.mp4",
        "poster": "/videos/DUayEMCDo7n.jpg"
      }
    }
  ]
};

export const INSTAGRAM_POST_SOURCE = "manual";
