export type ManifestoSection = {
  title: string;
  paragraphs: string[];
};

export type ManifestoLocale = {
  title: string;
  subtitle: string;
  summary: string;
  sections: ManifestoSection[];
};

export const MANIFESTO: Record<'ko' | 'en', ManifestoLocale> = {
  ko: {
    title: '서울실록',
    subtitle: '도시 탐험, AI 매개 예술, 그리고 일상의 재구성에 관한 선언문',
    summary: '서울의 모든 동네를 걷고 기록하는 과정을 통해, 반복되는 삶을 예술적 실천으로 바꾸려는 프로젝트의 중심 생각을 정리한 글입니다.',
    sections: [
      {
        title: '서문',
        paragraphs: [
          '서울실록은 서울의 모든 행정동과 법정동을 직접 걷고, 목격하고, 기록해 나가는 하나의 예술적이자 철학적인 프로젝트다. 이 작업은 단순하지만 급진적인 믿음에서 출발한다. 반복되는 일상의 질감 역시 예술로 변형될 수 있다는 믿음이다.',
          'AI 기반의 1인 제작 시스템을 통해, 이 프로젝트는 기술을 단순한 효율의 도구가 아니라 일상의 보이지 않던 표면을 덧칠하는 알고리듬적 붓으로 다룬다. 동시에 그것은 자본주의적 가치 생산의 논리 내부를 통과하면서도, 규율과 반복, 극도의 의도성으로 자신을 단련하는 동시대의 <em>월든</em>을 실험한다.',
          '이 틀 안에서 도시는 하나의 환경이 되고, 예술가는 최적화만이 아니라 의미와 아름다움, 체험적 보상을 찾아 도시를 가로지르는 강화학습(RL) 에이전트가 된다. <em>서울실록</em>은 수동적인 기록이 아니다. 그것은 루틴을 의식으로, 배회를 저작으로, 도시를 미적 가능성의 장소로 바꾸는 하나의 방법이다.'
        ]
      },
      {
        title: '음악이 되는 일상',
        paragraphs: [
          '현대의 삶은 경이 없는 안무로 굳어지기 쉽다. 정해진 동선, 거래적인 대화, 반복되는 몸짓, 예측 가능한 욕망. 우리는 출근하고, 응답하고, 소비하고, 반복한다. 하루는 효율적이지만, 그만큼 쉽게 무감해진다.',
          '그러나 예술은 정확히 그 반복의 균열에서 시작된다. 골목은 무대가 될 수 있고, 루틴은 악보가 될 수 있다. 일상을 미학화한다는 것은 현실도피가 아니다. 그것은 무감각에게 인간의 존엄을 내주지 않겠다는 선언이다.',
          '더 이상 문자 그대로 거리에서 뮤지컬처럼 살아갈 수 없다면, AI는 그 충동이 다른 방식으로 살아남게 하는 새로운 매체가 된다. AI는 아마추어 예술가의 반경을 넓힌다. 이제 우리는 시장의 허락을 기다려서가 아니라, 내면의 사유가 형태를 요구하기 때문에 창작할 수 있다.'
        ]
      },
      {
        title: '이방인의 시선과 공간을 아는 힘',
        paragraphs: [
          '한 번이라도 바깥에 서본 사람에게는 특유의 선명함이 주어진다. 유학생으로 살아본 시간은 나를 집에서 멀어지게 하기보다 오히려 더 깊이 연결했다. 한국은 더 이상 배경이 아니라, 다시 발견된 감각으로 돌아왔다.',
          '지금 세계는 한국의 동네, 음악, 패션, 분위기에 주목하고 있다. 그래서 서울을 관광 엽서처럼 소비하는 대신, 숨은 질감의 아카이브로 기록해야 할 필요가 생긴다. 반쯤은 내부자이고 반쯤은 외부자인 시선은 익숙함이 가려버린 것을 본다.',
          '하지만 이것은 감상적인 프로젝트만은 아니다. 도시를 깊이 안다는 것은 미묘하지만 분명한 힘을 갖는 일이다. 작은 카페, 오래된 식당, 골목, 서점, 계단, 해 질 무렵의 뷰 같은 것들은 사소한 정보가 아니다. 그것들은 초대와 이동, 친밀감과 만남의 방식을 바꾼다. 공간을 아는 일은 결국 사람과 삶을 조직하는 하나의 힘이 된다.'
        ]
      },
      {
        title: '붓이자 스튜디오인 AI',
        paragraphs: [
          'AI 연구자로서 어느 순간부터는 벤치마크와 리더보드만으로는 충분하지 않다. 진짜 질문은 AI가 무엇을 해결하느냐만이 아니라, 무엇을 표현하게 해주느냐에 있다.',
          'AI는 지금까지 등장한 가장 복합적인 예술 매체다. 그것은 쓰고, 그리며, 작곡하고, 편집하고, 서술하고, 합성한다. 텍스트와 이미지, 사운드와 영상을 하나의 계속 진화하는 스튜디오 안으로 압축한다. 여기서 새로운 창작자의 형상이 나온다. 작은 방과 노트북, 카메라와 집요함만으로 하나의 미적 세계를 연출하는 1인 연출가, 곧 침실의 감독이다.',
          '이 변화에는 윤리도 필요하다. 완벽주의는 움직임에 자리를 내줘야 한다. 작업은 포착되고, 공개되고, 수정되고, 다시 살아가야 한다. 목표는 흠 없는 기념비를 세우는 것이 아니라, 감정의 열기가 자기검열로 식기 전에 그것을 세상에 내놓는 데 있다.'
        ]
      },
      {
        title: '현대의 월든',
        paragraphs: [
          '우리는 정보와 가속, 주의 분산의 눈보라 아래 살고 있다. 이런 환경에서 정신은 단지 더 많이 알게 되는 것이 아니라, 점점 더 파편화된다.',
          '예전에는 도망치는 상상을 했다. 디지털 디톡스, 거리 두기, 철수. 그러나 이제 그것만으로는 충분하지 않다. 오늘의 과제는 더 어렵다. 기술로부터의 금욕이 아니라, 기술 속으로의 의도적인 몰입이다. 기계 안에 머물되 기계적인 존재가 되지 않는 것.',
          '그래서 <em>서울실록</em>은 숲이 아니라 도시 한가운데 세워지는 동시대의 <em>월든</em>이 된다. 동시에 그것은 스스로에게 부과한 하나의 훈련실이기도 하다. 그 방법은 루틴이고, 엔진은 반복이며, 힘은 축적에서 나온다.',
          '매일은 하나의 테스트가 된다. 평범한 것들로부터 여전히 아름다움을 길어 올릴 수 있는가. 너무 익숙한 것을 다시 수수께끼처럼 읽어낼 수 있는가. 이것은 단순한 생산성의 문제가 아니라, 존재를 측정하는 방식이다.'
        ]
      },
      {
        title: '도시는 환경이고, 나는 에이전트다',
        paragraphs: [
          '<em>서울실록</em>은 수동적인 관찰을 거부한다. 도시를 걷는 것만으로는 충분하지 않다. 그 회로 안으로 들어가, 아주 조금이라도 내가 지나간 공간의 분위기를 바꿔야 한다.',
          '길 잃은 외국인을 돕는 일, 일요일의 자원봉사, 동네 카페를 무성 DJ 파티의 장소로 상상하는 일. 이런 것들은 부수적인 활동이 아니다. 그것들은 도시를 조금 더 살아 있게 만드는 작은 퍼포먼스이자 참여의 형식이다.',
          '이 관점에서 보면 자아는 복잡한 환경 속을 움직이는 강화학습(RL) 에이전트처럼 상상될 수 있다. 하지만 인간의 보상은 돈으로만 환산되지 않는다. 효용은 감정적이고, 윤리적이며, 미적이고, 관계적이다. 때로 가장 큰 보상은 무언가를 빼앗아 오는 데 있는 것이 아니라, 무언가를 더 살아 있게 만드는 데 있다.'
        ]
      },
      {
        title: '리믹스를 넘어',
        paragraphs: [
          '모든 시작은 리믹스에서 출발한다. 우리는 이미 존재하는 형식을 다시 배열하고, 오래된 것을 새롭게 읽고, 현재를 기록하면서 반복 속에서 자기만의 주파수를 듣는 법을 배운다.',
          '지금 필요한 것은 이 단계에 충실해지는 일이다. 걷고, 기록하고, 변형하고, 계속해 나가는 것. 미래의 아이디어는 노트에 잠시 머물러도 된다. 중요한 것은 현재의 프로젝트와 오래 함께 있는 일이다. 반복이 스타일이 되고, 스타일이 철학이 될 때까지.',
          '<em>서울실록</em>이 끝났을 때, 그 잔여물은 기록물 안에만 머물지 않을 것이다. 그것은 오리지널 음악, 독자적인 AI 모델, 영상 작업, 철학적 텍스트로 응결될 것이다. 아카이브는 결국 씨앗이 된다.',
          'AI는 끝없이 생성할 수 있어도, 인간의 취향과 확률적 직감, 윤리적 기질, 그리고 단 하나의 감각이 지닌 자기장까지 완전히 대체하지는 못한다. <em>서울실록</em>의 궁극적인 목표는 서울을 기록하는 데 그치지 않는다. 오랜 훈련과 도시와의 실제 접촉을 통해, 만드는 일에 대한 하나의 독자적 철학을 길어 올리는 데 있다.'
        ]
      }
    ]
  },
  en: {
    title: 'Seoul Sillok',
    subtitle: 'An artistic manifesto on urban exploration, AI-mediated art, and the reimagining of the everyday',
    summary: 'A project statement about walking every neighborhood in Seoul and turning ordinary repetition into artistic practice through discipline, attention, and AI-mediated making.',
    sections: [
      {
        title: 'Introduction',
        paragraphs: [
          'Seoul Sillok is an ongoing artistic and philosophical project: a commitment to walk, witness, and archive every administrative and legal neighborhood (dong) in Seoul. It begins from a simple but radical belief: that the repetitive texture of ordinary life can be transformed into art.',
          'Through an AI-driven one-person production system, the project treats technology not merely as a tool of efficiency, but as an algorithmic brush capable of painting over the overlooked surfaces of daily life. It moves within the logic of capitalist value creation while staging a contemporary <em>Walden</em>: an experiment in self-cultivation through discipline, repetition, and radical intentionality.',
          'In this framework, the city becomes an environment, and the artist becomes a Reinforcement Learning (RL) agent moving through the urban fabric in search not only of optimization, but of meaning, beauty, and experiential reward. <em>Seoul Sillok</em> is not a passive archive. It is a method for turning routine into ritual, wandering into authorship, and the city itself into a site of aesthetic possibility.'
        ]
      },
      {
        title: 'The Everyday, Set to Music',
        paragraphs: [
          'Modern life too easily hardens into choreography without wonder: dictated routes, transactional conversations, rehearsed gestures, predictable desires. We commute, respond, consume, and repeat. The days become efficient, yet spiritually mute.',
          'And yet art begins precisely here, in the break inside repetition. A sidewalk can become a stage. A routine can become a score. To aestheticize daily life is not escapism; it is a refusal to surrender human dignity to numbness.',
          'If we can no longer live out public musicality in literal form, then AI becomes the medium through which that same impulse survives. It expands the reach of the amateur artist. One can now create not because the market has granted permission, but because inner life insists on being shaped and released.'
        ]
      },
      {
        title: "The Outsider's Gaze and the Power of Spatial Knowledge",
        paragraphs: [
          "There is a particular clarity given to those who have once stood slightly outside. As a former international student, distance did not weaken my attachment to home; it deepened it. Korea returned to me not as background, but as revelation.",
          'Now, as global attention turns toward Korean neighborhoods, music, fashion, and atmosphere, there is urgency in documenting Seoul not as a tourist postcard, but as an archive of hidden textures. The slightly estranged gaze notices what habit conceals.',
          'But this is not merely a sentimental project. It is also practical. To know a city intimately, its hidden cafes, neighborhood restaurants, alleyways, bookstores, staircases, and twilight views, is to possess a subtle but real form of power. Spatial knowledge shapes invitation, movement, intimacy, and encounter. It reorganizes how one lives with others.'
        ]
      },
      {
        title: 'AI as Brush and Studio',
        paragraphs: [
          'As an AI researcher, there comes a point when benchmarks and leaderboards are no longer enough. The real question is not only what AI can solve, but what it can help us express.',
          'AI is the most composite artistic medium yet assembled. It can write, compose, illustrate, edit, narrate, and synthesize. It compresses text, image, sound, and video into a single evolving studio. From this emerges a new figure: the bedroom director, the one-person creator capable of orchestrating an entire aesthetic world from a small room, a laptop, and an obsession.',
          'This also requires an ethic. Perfectionism must give way to movement. The work should be captured, released, revised, and lived with. The goal is not to produce an untouchable monument, but to preserve emotional heat before it cools into self-censorship.'
        ]
      },
      {
        title: 'A Modern Walden',
        paragraphs: [
          'We live beneath an avalanche of information, acceleration, and distraction. Under such conditions, the mind does not simply become informed; it becomes fragmented.',
          'An earlier fantasy of escape, digital detox, distance, withdrawal, no longer feels adequate. The challenge now is harder: not abstinence from technology, but intentional immersion in it. To remain inside the machine without becoming machinic.',
          'For this reason, <em>Seoul Sillok</em> becomes a self-imposed chamber of discipline, a contemporary <em>Walden</em> built not in the woods, but in the city. Its method is routine. Its engine is repetition. Its force lies in accumulation.',
          'Each day becomes a test: can beauty still be extracted from the ordinary? Can the familiar still be read like a riddle? This is not merely a question of productivity. It is a way of measuring existence itself.'
        ]
      },
      {
        title: 'The City as Environment, the Self as Agent',
        paragraphs: [
          '<em>Seoul Sillok</em> refuses passive observation. To walk a city is not enough; one must enter its circuits and alter, however slightly, the atmosphere one passes through.',
          'Helping lost foreigners, volunteering on Sundays, imagining a silent DJ party in a neighborhood cafe, these are not side activities. They are forms of urban performance, small acts through which the city becomes more alive.',
          'Within this framework, the self can be imagined as a Reinforcement Learning (RL) agent operating inside a dense and dynamic environment. But human reward cannot be reduced to money. Utility is emotional, ethical, aesthetic, and relational. Sometimes the highest reward is not extraction, but enrichment.'
        ]
      },
      {
        title: 'Beyond the Remix',
        paragraphs: [
          "Every beginning starts in remix. One rearranges inherited forms, reinterprets old materials, archives the present, and learns through repetition how to hear one's own frequency.",
          'For now, the task is to remain faithful to this phase: to walk, record, transform, and continue. Future ideas can wait in notes. What matters is staying with the current project until repetition becomes style, and style becomes philosophy.',
          'When <em>Seoul Sillok</em> is complete, its residue will not remain confined to archives. It will crystallize into original music, proprietary AI models, moving-image works, and philosophical texts. The archive will become seed.',
          'AI may generate endlessly, but it still cannot fully replace human taste, probabilistic intuition, moral temperament, or the magnetic force of a singular sensibility. The ultimate aim is not simply to document Seoul, but to develop, through long discipline and lived contact with the city, an original philosophy of making.'
        ]
      }
    ]
  }
};
